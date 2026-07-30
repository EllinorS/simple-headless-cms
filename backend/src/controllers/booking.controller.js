import asyncHandler from '../utils/asyncHandler.js';
import * as bookingModel from '../models/booking.model.js';
import * as siteContentModel from '../models/siteContent.model.js';
import * as bookingCreation from '../services/handleBookingCreation.js';
import * as bookingReschedule from '../services/handleBookingReschedule.js';
import * as bookingCancellation from '../services/handleBookingCancellation.js';
import * as bookingConfirmation from '../services/handleBookingConfirmation.js';
import { toBookingDTO } from '../utils/dto.js';
import {
  bookingConfirmationEmail,
  packageBookingConfirmationEmail,
  bookingAwaitingPaymentEmail,
  packageAwaitingPaymentEmail,
  bookingCancelledEmail,
  bookingRescheduledEmail,
} from '../config/mailer.js';

// Bank details live in site_content so an admin can update them without a redeploy — see
// content-blocks.ts's PAGE_BLOCKS for the corresponding admin-editable keys.
const getBankDetails = async () => {
  const keys = ['booking_bank_name', 'booking_bank_account_name', 'booking_bank_account_number', 'booking_payment_note'];
  const [bankName, accountName, accountNumber, note] = await Promise.all(
    keys.map((k) => siteContentModel.findContentByKey(k)),
  );
  return {
    bankName: bankName?.value ?? '',
    accountName: accountName?.value ?? '',
    accountNumber: accountNumber?.value ?? '',
    note: note?.value ?? '',
  };
};

// POST /api/bookings — single lesson. Booking starts PENDING (holds the slot up to 48h,
// less for last-minute bookings — see paymentHoldExpiry) — the
// client is told to bank-transfer the deposit, not that the booking is confirmed yet.
export const createBooking = asyncHandler(async (req, res) => {
  const { bookingId, cancelToken, slot, lesson, expiresAt } = await bookingCreation.createSingleBooking(req.body);
  const bankDetails = await getBankDetails();
  const holdHours = Math.max(1, Math.round((expiresAt.getTime() - Date.now()) / (60 * 60 * 1000)));
  await bookingAwaitingPaymentEmail(
    req.body.clientFirstname,
    req.body.clientEmail,
    lesson.title,
    slot.date,
    slot.time,
    bookingId,
    lesson.depositAmount,
    holdHours,
    bankDetails,
  );
  res.status(201).json({ message: 'Booking received — awaiting payment', data: { bookingId, cancelToken } });
});

// POST /api/bookings/multiple — package (3/5 sessions). Same PENDING-hold flow as above.
export const createMultipleBookings = asyncHandler(async (req, res) => {
  const { parentBookingId, groupCancelToken, sessions, lesson, expiresAt } = await bookingCreation.createPackageBooking(
    req.body,
  );
  const bankDetails = await getBankDetails();
  const holdHours = Math.max(1, Math.round((expiresAt.getTime() - Date.now()) / (60 * 60 * 1000)));
  await packageAwaitingPaymentEmail(
    req.body.clientFirstname,
    req.body.clientEmail,
    lesson.title,
    sessions,
    parentBookingId,
    lesson.depositAmount,
    holdHours,
    bankDetails,
  );
  res.status(201).json({ message: 'Package received — awaiting payment', data: { parentBookingId, groupCancelToken } });
});

// GET /api/bookings (admin)
export const getAllBookings = asyncHandler(async (req, res) => {
  const bookings = await bookingModel.findAllBookings();
  res.json({ data: bookings.map(toBookingDTO) });
});

// GET /api/bookings/:id (admin)
export const getBookingById = asyncHandler(async (req, res) => {
  const booking = await bookingModel.findBookingById(req.params.id);
  if (!booking) return res.status(404).json({ message: 'Booking not found.' });
  res.json({ data: toBookingDTO(booking) });
});

// GET /api/bookings/cancel/preview?token= — client self-service preview (single booking)
export const previewBooking = asyncHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: 'Token is required.' });
  const booking = await bookingModel.findBookingByCancelTokenAnyExpiry(token);
  if (!booking) return res.status(400).json({ message: 'This link is invalid.' });
  if (new Date(booking.cancel_token_expires_at) <= new Date()) {
    return res.status(400).json({
      message:
        'Your session starts within 24 hours, so online changes are no longer available. Please contact us directly.',
    });
  }
  res.json({ data: toBookingDTO(booking) });
});

// GET /api/bookings/cancel/package/preview?token= — client self-service preview (whole package).
// Each session's own cancel_token is included here (unlike the generic toBookingDTO, which
// never exposes it) so the client can reschedule an individual session — safe because reaching
// this response already required proving ownership via the group_cancel_token.
export const previewPackage = asyncHandler(async (req, res) => {
  const { token } = req.query;
  if (!token) return res.status(400).json({ message: 'Token is required.' });
  const group = await bookingModel.findBookingByGroupToken(token);
  if (!group) return res.status(400).json({ message: 'Invalid or expired link.' });
  res.json({
    data: {
      ...toBookingDTO(group),
      sessions: group.sessions.map((s) => ({ ...toBookingDTO(s), cancelToken: s.cancel_token })),
    },
  });
});

// Package-reschedule reminder: the rest of the package's sessions (excluding the one that
// just moved, already shown separately as the new date) so the email is self-contained.
const getOtherPackageSessions = async (result) => {
  if (result.sessionsRequired <= 1) return [];
  const rootId = result.parentBookingId ?? result.bookingId;
  const sessions = await bookingModel.findGroupSessionsById(rootId);
  return sessions
    .filter((s) => s.id !== result.bookingId)
    .map((s) => ({ date: s.slot_date, time: s.slot_time }));
};

// POST /api/bookings/reschedule — client self-service, {token, newSlotId}
export const rescheduleBooking = asyncHandler(async (req, res) => {
  const { token, newSlotId } = req.body;
  const result = await bookingReschedule.rescheduleByToken(token, newSlotId);
  const otherSessions = await getOtherPackageSessions(result);
  await bookingRescheduledEmail(
    result.clientFirstname,
    result.clientEmail,
    result.lessonTitle,
    result.oldSlot,
    result.newSlot,
    result.cancelToken,
    otherSessions,
  );
  res.json({ message: 'Session rescheduled' });
});

// POST /api/bookings/cancel — client self-service, {token}. Rejects a package session
// (sessions_required > 1) with a 400 — those can only be rescheduled, not cancelled.
export const cancelBooking = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const booking = await bookingCancellation.cancelByToken(token);
  await bookingCancelledEmail(
    booking.client_firstname,
    booking.client_email,
    booking.lesson_title,
    booking.slot_date,
    booking.slot_time,
    false,
  );
  res.json({ message: 'Booking cancelled' });
});

// POST /api/bookings/cancel/package — client self-service, {token} (group_cancel_token)
export const cancelPackage = asyncHandler(async (req, res) => {
  const { token } = req.body;
  const group = await bookingCancellation.cancelGroupByToken(token);
  await bookingCancelledEmail(
    group.client_firstname,
    group.client_email,
    group.lesson_title,
    group.slot_date,
    group.slot_time,
    true,
  );
  res.json({ message: 'Package cancelled' });
});

// PATCH /api/bookings/:id/mark-paid (admin) — confirms a PENDING booking (or its whole
// package, via the same rootId resolution used elsewhere) once the bank transfer has landed.
// Sends the real confirmation email — the awaiting-payment email at creation time was not one.
export const adminMarkPaid = asyncHandler(async (req, res) => {
  const booking = await bookingConfirmation.confirmByAdmin(req.params.id);
  if (booking.sessions_required > 1) {
    const group = await bookingModel.findBookingByGroupToken(booking.group_cancel_token);
    await packageBookingConfirmationEmail(
      booking.client_firstname,
      booking.client_email,
      booking.lesson_title,
      (group?.sessions ?? []).map((s) => ({ slot: { date: s.slot_date, time: s.slot_time } })),
      booking.group_cancel_token,
    );
  } else {
    await bookingConfirmationEmail(
      booking.client_firstname,
      booking.client_email,
      booking.lesson_title,
      booking.slot_date,
      booking.slot_time,
      booking.cancel_token,
    );
  }
  res.json({ message: 'Booking confirmed', data: toBookingDTO(booking) });
});

// PATCH /api/bookings/:id/reschedule (admin) — bypasses the 24h window. Client is emailed the
// same as the self-service path — a coach-initiated reschedule must never go unnotified.
export const adminReschedule = asyncHandler(async (req, res) => {
  const { newSlotId } = req.body;
  const result = await bookingReschedule.rescheduleByAdmin(req.params.id, newSlotId);
  const otherSessions = await getOtherPackageSessions(result);
  await bookingRescheduledEmail(
    result.clientFirstname,
    result.clientEmail,
    result.lessonTitle,
    result.oldSlot,
    result.newSlot,
    result.cancelToken,
    otherSessions,
  );
  res.json({ message: 'Session rescheduled' });
});

// PATCH /api/bookings/:id/cancel (admin) — bypasses the 24h window and package-session
// restriction. Cancels a single row only, so isPackage is always false here (see
// adminCancelGroup for the whole-package path).
export const adminCancel = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  const booking = await bookingCancellation.cancelByAdmin(req.params.id, reason);
  await bookingCancelledEmail(
    booking.client_firstname,
    booking.client_email,
    booking.lesson_title,
    booking.slot_date,
    booking.slot_time,
    false,
  );
  res.json({ message: 'Booking cancelled', data: toBookingDTO(booking) });
});

// PATCH /api/bookings/:id/cancel-group (admin) — cancels an entire package in one action.
// Accepts any booking id belonging to the group (parent or child).
export const adminCancelGroup = asyncHandler(async (req, res) => {
  const { reason } = req.body;
  const group = await bookingCancellation.cancelGroupByAdmin(req.params.id, reason);
  await bookingCancelledEmail(
    group.client_firstname,
    group.client_email,
    group.lesson_title,
    group.slot_date,
    group.slot_time,
    true,
  );
  res.json({ message: 'Package cancelled', data: toBookingDTO(group) });
});
