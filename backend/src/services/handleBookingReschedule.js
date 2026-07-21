import * as bookingModel from '../models/booking.model.js';
import * as slotModel from '../models/slot.model.js';
import { withTransaction } from '../utils/transactionHelper.js';
import { cancelWindowExpiry } from '../utils/nzTime.js';

// Shared by both the client and admin paths. The 24h window itself is enforced upstream by
// which lookup function found the booking: findBookingByCancelToken only returns a row while
// cancel_token_expires_at is still in the future; findBookingById (admin) has no such filter —
// that's the confirmed coach override.
const resolveReschedule = async (booking, newSlotId) => {
  if (booking.status === 'CANCELLED') {
    throw Object.assign(new Error('This booking is already cancelled'), { status: 400 });
  }

  const newSlot = await slotModel.findSlotById(newSlotId);
  if (!newSlot) throw Object.assign(new Error('Slot not found'), { status: 404 });
  if (newSlot.is_cancelled) throw Object.assign(new Error('This session is cancelled'), { status: 400 });
  if (newSlot.id === booking.slot_id) {
    throw Object.assign(new Error('This is already your scheduled session'), { status: 400 });
  }
  // Reschedule must stay within the same lesson type as the original session (Adults stays
  // Adults, Kids stays Kids) — compare against the slot's own lesson_id, not the booking's
  // purchased-product lesson_id (which, for a package, is the package's own catalog row).
  if (newSlot.lesson_id !== booking.slot_lesson_id) {
    throw Object.assign(new Error('You can only reschedule to a session of the same type'), { status: 400 });
  }

  const siblingSlotIds = await bookingModel.findSiblingSlotIds(booking.id, booking.parent_booking_id);
  if (siblingSlotIds.includes(newSlot.id)) {
    throw Object.assign(new Error('You already have a session booked on that date'), { status: 400 });
  }

  const newCancelTokenExpiresAt = cancelWindowExpiry(newSlot.date, newSlot.time);

  return withTransaction(async (connection) => {
    const capacity = await slotModel.lockSlotCapacity(newSlot.id, connection);
    if (!capacity || capacity.isCancelled) {
      throw Object.assign(new Error('This session is cancelled'), { status: 400 });
    }
    if (capacity.maxParticipants - capacity.taken < 1) {
      throw Object.assign(new Error('Sorry, that session is full'), { status: 409 });
    }
    await bookingModel.rescheduleBookingRow(booking.id, newSlot.id, newCancelTokenExpiresAt, connection);
    return {
      bookingId: booking.id,
      clientFirstname: booking.client_firstname,
      clientEmail: booking.client_email,
      lessonTitle: booking.lesson_title,
      cancelToken: booking.cancel_token,
      oldSlot: { date: booking.slot_date, time: booking.slot_time },
      newSlot,
      sessionsRequired: booking.sessions_required,
      parentBookingId: booking.parent_booking_id,
    };
  });
};

export const rescheduleByToken = async (token, newSlotId) => {
  const booking = await bookingModel.findBookingByCancelToken(token);
  if (!booking) throw Object.assign(new Error('Invalid or expired link'), { status: 400 });
  return resolveReschedule(booking, newSlotId);
};

export const rescheduleByAdmin = async (bookingId, newSlotId) => {
  const booking = await bookingModel.findBookingById(bookingId);
  if (!booking) throw Object.assign(new Error('Booking not found'), { status: 404 });
  return resolveReschedule(booking, newSlotId);
};
