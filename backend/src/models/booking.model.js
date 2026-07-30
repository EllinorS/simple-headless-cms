import { db } from '../config/db.js';

// A booking is a client's reservation of one time_slot. Packages are N booking rows sharing
// a lesson_id (the purchased catalog product, e.g. "3-Pack — Adults") and linked via
// parent_booking_id — the first row is the parent (holds total_price_at_booking, sessions_required,
// group_cancel_token). Every row keeps its own cancel_token so an individual package session can
// be managed (rescheduled) independently of the group.

const BOOKING_SELECT = `
  SELECT b.id, b.slot_id, b.lesson_id, b.parent_booking_id,
         b.client_firstname, b.client_lastname, b.client_email, b.client_phone,
         b.participants, b.total_price_at_booking, b.status, b.cancelled_by,
         b.cancel_reason, b.cancelled_at, b.cancel_token, b.cancel_token_expires_at,
         b.group_cancel_token, b.balance_token, b.sessions_required, b.notes,
         b.expires_at, b.created_at, b.updated_at,
         DATE_FORMAT(ts.date, '%Y-%m-%d') AS slot_date, ts.time AS slot_time, ts.lesson_id AS slot_lesson_id,
         l.title AS lesson_title, l.is_package, l.type AS lesson_type
  FROM bookings b
  JOIN time_slots ts ON ts.id = b.slot_id
  JOIN lessons l ON l.id = b.lesson_id
`;

// Atomic capacity + cancellation check: the INSERT only succeeds if the slot is still not
// cancelled AND max_participants still covers every non-cancelled booking on this slot plus
// the new one — closing both the race where two concurrent requests could both read "1 spot
// left" and both succeed, and the race where the slot gets cancelled between the service
// layer's read and this write.
export const createBookingRow = async (data, connection = db) => {
  const {
    slotId, lessonId, parentBookingId, clientFirstname, clientLastname, clientEmail,
    clientPhone, participants, totalPriceAtBooking, status, cancelToken,
    cancelTokenExpiresAt, expiresAt, sessionsRequired, notes,
  } = data;

  // The capacity subquery also excludes an expired, still-unpaid PENDING hold — once its
  // 48h payment window has lapsed it stops counting against capacity, freeing the slot for
  // the next booking attempt without any cleanup job.
  const sql = `
    INSERT INTO bookings (
      slot_id, lesson_id, parent_booking_id, client_firstname, client_lastname,
      client_email, client_phone, participants, total_price_at_booking, status,
      cancel_token, cancel_token_expires_at, expires_at, sessions_required, notes
    )
    SELECT ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?
    FROM time_slots
    WHERE id = ?
    AND is_cancelled = 0
    AND max_participants >= (
      SELECT COALESCE(SUM(participants), 0) + ?
      FROM bookings
      WHERE slot_id = ?
      AND status != 'CANCELLED'
      AND NOT (status = 'PENDING' AND expires_at < UTC_TIMESTAMP())
    )
  `;
  const values = [
    slotId, lessonId, parentBookingId ?? null, clientFirstname, clientLastname, clientEmail,
    clientPhone ?? null, participants, totalPriceAtBooking ?? null, status, cancelToken,
    cancelTokenExpiresAt, expiresAt ?? null, sessionsRequired, notes ?? null,
    slotId, participants, slotId,
  ];
  const [result] = await connection.query(sql, values);
  if (result.affectedRows === 0) {
    throw Object.assign(new Error('Sorry, this session is no longer available'), { status: 409 });
  }
  return result.insertId;
};

export const setGroupCancelToken = async (connection, bookingId, groupCancelToken) => {
  await connection.query('UPDATE bookings SET group_cancel_token = ? WHERE id = ?', [groupCancelToken, bookingId]);
};

// Used to guard slot deletion — a slot with active bookings must not be hard-deleted.
export const countActiveBookingsBySlot = async (slotId) => {
  const [rows] = await db.query(
    `SELECT COUNT(*) AS count FROM bookings WHERE slot_id = ? AND status != 'CANCELLED'`,
    [slotId],
  );
  return rows[0].count;
};

export const findAllBookings = async () => {
  const [rows] = await db.query(`${BOOKING_SELECT} ORDER BY b.created_at DESC`);
  return rows;
};

export const findBookingById = async (id) => {
  const [rows] = await db.query(`${BOOKING_SELECT} WHERE b.id = ?`, [id]);
  return rows[0];
};

export const findBookingByCancelToken = async (token) => {
  // UTC_TIMESTAMP() (not NOW()) — matches the true-UTC instant produced by
  // utils/nzTime.js#cancelWindowExpiry, independent of the MySQL server's session timezone.
  const [rows] = await db.query(
    `${BOOKING_SELECT} WHERE b.cancel_token = ? AND b.cancel_token_expires_at > UTC_TIMESTAMP()`,
    [token],
  );
  return rows[0];
};

// Preview-only: matches on token alone (no expiry filter), so the read-only preview endpoint
// can tell "token doesn't exist" apart from "token exists but the 24h window has closed" and
// message each case differently. Never use this for the actual cancel/reschedule actions —
// those must keep going through findBookingByCancelToken above, whose expiry filter is the
// enforcement of the 24h rule (see handleBookingReschedule.js's resolveReschedule comment).
export const findBookingByCancelTokenAnyExpiry = async (token) => {
  const [rows] = await db.query(`${BOOKING_SELECT} WHERE b.cancel_token = ?`, [token]);
  return rows[0];
};

// Returns the parent row plus every sibling (parent + children) sharing the group token.
export const findBookingByGroupToken = async (token) => {
  const [parentRows] = await db.query(
    `${BOOKING_SELECT} WHERE b.group_cancel_token = ? AND b.status != 'CANCELLED'`,
    [token],
  );
  const parent = parentRows[0];
  if (!parent) return null;

  const [sessionRows] = await db.query(
    `${BOOKING_SELECT} WHERE (b.id = ? OR b.parent_booking_id = ?) AND b.status != 'CANCELLED' ORDER BY ts.date ASC, ts.time ASC`,
    [parent.id, parent.id],
  );
  return { ...parent, sessions: sessionRows };
};

// All non-cancelled sessions (parent + siblings) for a group, keyed by root id rather than
// group_cancel_token — used to build the "your full schedule" reminder after a package
// reschedule, where the caller already has the booking row (and thus the root id) in hand.
// Root bookings (single lessons, or the first session of a package) still awaiting their
// review-request email — one row per client purchase, never per individual package session.
export const findPendingReviewRequestRoots = async () => {
  const [rows] = await db.query(
    `${BOOKING_SELECT} WHERE b.parent_booking_id IS NULL AND b.status = 'CONFIRMED' AND b.review_email_sent_at IS NULL`,
  );
  return rows;
};

export const markReviewEmailSent = async (id) => {
  await db.query(`UPDATE bookings SET review_email_sent_at = NOW() WHERE id = ?`, [id]);
};

// Individual sessions (any position in a package, or a single-lesson booking) still awaiting
// their day-before reminder — one per session, not per purchase, since a client needs
// reminding before EACH date in a package, unlike the once-per-purchase review request.
export const findPendingSessionReminders = async () => {
  const [rows] = await db.query(
    `${BOOKING_SELECT} WHERE b.status = 'CONFIRMED' AND b.reminder_email_sent_at IS NULL`,
  );
  return rows;
};

export const markReminderEmailSent = async (id) => {
  await db.query(`UPDATE bookings SET reminder_email_sent_at = NOW() WHERE id = ?`, [id]);
};

export const findGroupSessionsById = async (rootId) => {
  const [rows] = await db.query(
    `${BOOKING_SELECT} WHERE (b.id = ? OR b.parent_booking_id = ?) AND b.status != 'CANCELLED' ORDER BY ts.date ASC, ts.time ASC`,
    [rootId, rootId],
  );
  return rows;
};

// Batch variant of findGroupSessionsById — all sessions (parent + siblings) for several
// roots in one query, keyed by root id via each row's own id (if it's the root) or
// parent_booking_id (if it's a sibling). Used by reviewRequestJob to avoid one query per root.
export const findGroupSessionsByRootIds = async (rootIds) => {
  if (rootIds.length === 0) return [];
  const [rows] = await db.query(
    `${BOOKING_SELECT} WHERE (b.id IN (?) OR b.parent_booking_id IN (?)) AND b.status != 'CANCELLED' ORDER BY ts.date ASC, ts.time ASC`,
    [rootIds, rootIds],
  );
  return rows;
};

export const cancelBookingRow = async (id, cancelledBy, reason) => {
  const [result] = await db.query(
    `UPDATE bookings SET status = 'CANCELLED', cancelled_by = ?, cancel_reason = ?, cancelled_at = NOW(), cancel_token = NULL WHERE id = ?`,
    [cancelledBy, reason ?? null, id],
  );
  return result.affectedRows;
};

export const cancelGroupByToken = async (parentId, cancelledBy, reason) => {
  const [result] = await db.query(
    `UPDATE bookings SET status = 'CANCELLED', cancelled_by = ?, cancel_reason = ?, cancelled_at = NOW(), cancel_token = NULL, group_cancel_token = NULL
     WHERE (id = ? OR parent_booking_id = ?) AND status != 'CANCELLED'`,
    [cancelledBy, reason ?? null, parentId, parentId],
  );
  return result.affectedRows;
};

// Confirms payment for a whole group (parent + siblings) in one statement — naturally covers
// a single (non-package) booking too, since it has no children and this just updates the one row.
export const confirmBookingGroup = async (rootId, connection = db) => {
  const [result] = await connection.query(
    `UPDATE bookings SET status = 'CONFIRMED' WHERE (id = ? OR parent_booking_id = ?) AND status = 'PENDING'`,
    [rootId, rootId],
  );
  return result.affectedRows;
};

// Called only after the service layer has verified capacity + type match inside a transaction.
// cancel_token_expires_at is refreshed to the new session's 24h-before mark.
export const rescheduleBookingRow = async (id, newSlotId, newCancelTokenExpiresAt, connection = db) => {
  const [result] = await connection.query(
    `UPDATE bookings SET slot_id = ?, cancel_token_expires_at = ? WHERE id = ?`,
    [newSlotId, newCancelTokenExpiresAt, id],
  );
  return result.affectedRows;
};

// Slot ids already used by other bookings in the same package (parent + siblings), excluding
// the booking being rescheduled itself — used to stop a client swapping onto a date they
// already hold elsewhere in the same package.
export const findSiblingSlotIds = async (bookingId, parentBookingId) => {
  const rootId = parentBookingId ?? bookingId;
  const [rows] = await db.query(
    `SELECT id, slot_id FROM bookings WHERE (id = ? OR parent_booking_id = ?) AND status != 'CANCELLED' AND id != ?`,
    [rootId, rootId, bookingId],
  );
  return rows.map((r) => r.slot_id);
};
