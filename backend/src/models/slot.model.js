import { db } from '../config/db.js';

// A time_slot is a specific dated instance of a lesson (lesson_id FK for the fixed Type).
// price/duration/max_participants/deposit are pre-filled from the lesson's catalog defaults
// at creation time, then stored independently here so the admin can override them per slot.
// `level` stays catalog-only (joined from `lessons`) since it's not asked to vary per date.
const SLOT_SELECT = `
  SELECT ts.id, ts.lesson_id, DATE_FORMAT(ts.date, '%Y-%m-%d') AS date, ts.time,
         ts.duration_minutes, ts.max_participants, ts.price, ts.deposit_amount,
         ts.is_cancelled, ts.cancel_reason, ts.cancelled_at, ts.notes,
         l.title, l.level, l.type,
         (ts.max_participants - IFNULL((
           SELECT SUM(participants) FROM bookings
           WHERE slot_id = ts.id AND status != 'CANCELLED'
         ), 0)) AS spots_left
  FROM time_slots ts
  JOIN lessons l ON l.id = ts.lesson_id
`;

export const createSlot = async (slot) => {
  const { lessonId, date, time, durationMinutes, maxParticipants, price, depositAmount, notes = null } =
    slot;
  const [result] = await db.query(
    `INSERT INTO time_slots (lesson_id, date, time, duration_minutes, max_participants, price, deposit_amount, notes)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?)`,
    [lessonId, date, time, durationMinutes, maxParticipants, price, depositAmount, notes],
  );
  return result.insertId;
};

// Returns all slots (past + future + cancelled) for the admin schedule view
export const findAllSlots = async () => {
  const [rows] = await db.query(`${SLOT_SELECT} ORDER BY ts.date ASC, ts.time ASC`);
  return rows;
};

// Returns only upcoming, non-cancelled slots — public booking page + admin dashboard widget
export const findPublicSlots = async () => {
  const [rows] = await db.query(
    `${SLOT_SELECT} WHERE ts.date >= CURDATE() AND ts.is_cancelled = 0 ORDER BY ts.date ASC, ts.time ASC`,
  );
  return rows;
};

// Raw row (no join) — used for existence checks before update/cancel/delete
export const findSlotRawById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM time_slots WHERE id = ?`, [id]);
  return rows[0];
};

export const findSlotById = async (id) => {
  const [rows] = await db.query(`${SLOT_SELECT} WHERE ts.id = ?`, [id]);
  return rows[0];
};

const UPDATABLE_COLUMNS = {
  date: 'date',
  time: 'time',
  durationMinutes: 'duration_minutes',
  maxParticipants: 'max_participants',
  price: 'price',
  depositAmount: 'deposit_amount',
  notes: 'notes',
};

export const updateSlot = async (id, fields) => {
  const sets = [];
  const values = [];
  for (const [key, column] of Object.entries(UPDATABLE_COLUMNS)) {
    if (fields[key] !== undefined) {
      sets.push(`${column} = ?`);
      values.push(fields[key]);
    }
  }
  if (sets.length === 0) return 0;
  values.push(id);
  const [result] = await db.query(`UPDATE time_slots SET ${sets.join(', ')} WHERE id = ?`, values);
  return result.affectedRows;
};

// Marks a slot cancelled with a reason, keeping it visible in the admin schedule (audit trail)
export const cancelSlot = async (id, cancelReason) => {
  const [result] = await db.query(
    `UPDATE time_slots SET is_cancelled = 1, cancel_reason = ?, cancelled_at = NOW() WHERE id = ?`,
    [cancelReason, id],
  );
  return result.affectedRows;
};

// Hard delete — only meaningful while the slot has no bookings yet
export const deleteSlotById = async (id) => {
  const [result] = await db.query(`DELETE FROM time_slots WHERE id = ?`, [id]);
  return result.affectedRows;
};

// Locks the slot row inside a transaction and returns live capacity — used before a reschedule
// UPDATE, since MySQL disallows selecting-then-updating the same `bookings` table in one
// statement (the atomic INSERT...SELECT trick `createBookingRow` uses only works for INSERT).
export const lockSlotCapacity = async (slotId, connection) => {
  const [slotRows] = await connection.query(
    `SELECT max_participants, is_cancelled FROM time_slots WHERE id = ? FOR UPDATE`,
    [slotId],
  );
  const slot = slotRows[0];
  if (!slot) return null;
  const [countRows] = await connection.query(
    `SELECT COALESCE(SUM(participants), 0) AS taken FROM bookings WHERE slot_id = ? AND status != 'CANCELLED'`,
    [slotId],
  );
  return { maxParticipants: slot.max_participants, isCancelled: !!slot.is_cancelled, taken: countRows[0].taken };
};
