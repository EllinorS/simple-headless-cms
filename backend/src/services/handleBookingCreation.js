import { v4 as uuidv4 } from 'uuid';
import * as bookingModel from '../models/booking.model.js';
import * as lessonModel from '../models/lesson.model.js';
import * as slotModel from '../models/slot.model.js';
import { withTransaction } from '../utils/transactionHelper.js';
import { cancelWindowExpiry, nzWallClockToUtc, paymentHoldExpiry } from '../utils/nzTime.js';

export const createSingleBooking = async (data) => {
  const { lessonId, slotId, clientFirstname, clientLastname, clientEmail, clientPhone, notes } = data;

  const lesson = await lessonModel.findLessonById(lessonId);
  if (!lesson) throw Object.assign(new Error('Lesson not found'), { status: 404 });
  if (lesson.is_package) {
    throw Object.assign(new Error('Use /bookings/multiple for a package'), { status: 400 });
  }

  const slot = await slotModel.findSlotById(slotId);
  if (!slot) throw Object.assign(new Error('Slot not found'), { status: 404 });
  if (slot.is_cancelled) throw Object.assign(new Error('This session is cancelled'), { status: 400 });
  if (slot.lesson_id !== lesson.id) {
    throw Object.assign(new Error('This slot does not match the selected lesson'), { status: 400 });
  }

  const cancelToken = uuidv4();
  const cancelTokenExpiresAt = cancelWindowExpiry(slot.date, slot.time);
  // Payment hold: normally 48h to complete the bank transfer, clamped so it can never
  // outlive the session itself for last-minute bookings — see paymentHoldExpiry.
  const expiresAt = paymentHoldExpiry(slot.date, slot.time);

  return withTransaction(async (connection) => {
    const bookingId = await bookingModel.createBookingRow(
      {
        slotId,
        lessonId: lesson.id,
        parentBookingId: null,
        clientFirstname,
        clientLastname,
        clientEmail,
        clientPhone,
        participants: 1,
        totalPriceAtBooking: lesson.price,
        status: 'PENDING',
        cancelToken,
        cancelTokenExpiresAt,
        expiresAt,
        sessionsRequired: 1,
        notes,
      },
      connection,
    );
    return { bookingId, cancelToken, slot, lesson, expiresAt };
  });
};

export const createPackageBooking = async (data) => {
  const { lessonId, slotIds, clientFirstname, clientLastname, clientEmail, clientPhone } = data;

  const lesson = await lessonModel.findLessonById(lessonId);
  if (!lesson) throw Object.assign(new Error('Lesson not found'), { status: 404 });
  if (!lesson.is_package) throw Object.assign(new Error('This lesson is not a package'), { status: 400 });
  if (slotIds.length !== lesson.sessions_count) {
    throw Object.assign(new Error(`You must select exactly ${lesson.sessions_count} sessions`), { status: 400 });
  }
  if (new Set(slotIds).size !== slotIds.length) {
    throw Object.assign(new Error('You cannot book the same session twice'), { status: 400 });
  }

  const slots = await slotModel.findSlotsByIds(slotIds);
  if (slots.length !== slotIds.length) {
    throw Object.assign(new Error('Slot not found'), { status: 404 });
  }
  for (const slot of slots) {
    if (slot.is_cancelled) {
      throw Object.assign(new Error('One of the selected sessions is cancelled'), { status: 400 });
    }
    // Every session in a package must belong to the package's base lesson (same type,
    // e.g. all Adults) — ALAIA never enforced this, this project does.
    if (slot.lesson_id !== lesson.base_lesson_id) {
      throw Object.assign(new Error('All sessions in a package must be the same lesson type'), { status: 400 });
    }
  }
  slots.sort((a, b) => nzWallClockToUtc(a.date, a.time) - nzWallClockToUtc(b.date, b.time));

  // Payment hold is shared across every session in the package (they must all be paid for or
  // released together), so it's tied to the earliest session — the first one the client would
  // lose if they don't pay in time — not recomputed per slot.
  const expiresAt = paymentHoldExpiry(slots[0].date, slots[0].time);

  return withTransaction(async (connection) => {
    let parentBookingId = null;
    const sessions = [];

    // The first booking is the parent (holds the package's total price and sessions_required).
    // Every subsequent booking links back via parent_booking_id so the whole package can be
    // cancelled together, while each still keeps its own cancel_token for individual reschedule.
    for (let i = 0; i < slots.length; i++) {
      const slot = slots[i];
      const cancelToken = uuidv4();
      const cancelTokenExpiresAt = cancelWindowExpiry(slot.date, slot.time);

      const bookingId = await bookingModel.createBookingRow(
        {
          slotId: slot.id,
          lessonId: lesson.id,
          parentBookingId: i === 0 ? null : parentBookingId,
          clientFirstname,
          clientLastname,
          clientEmail,
          clientPhone,
          participants: 1,
          totalPriceAtBooking: i === 0 ? lesson.price : null,
          status: 'PENDING',
          cancelToken,
          cancelTokenExpiresAt,
          expiresAt,
          sessionsRequired: lesson.sessions_count,
          notes: null,
        },
        connection,
      );

      if (i === 0) parentBookingId = bookingId;
      sessions.push({ bookingId, slot, cancelToken });
    }

    const groupCancelToken = uuidv4();
    await bookingModel.setGroupCancelToken(connection, parentBookingId, groupCancelToken);

    return { parentBookingId, groupCancelToken, sessions, lesson, expiresAt };
  });
};
