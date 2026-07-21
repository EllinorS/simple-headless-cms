import * as bookingModel from '../models/booking.model.js';

// Client cancel of a single booking. A package session (sessions_required > 1) is intentionally
// NOT cancellable here — per the confirmed business rule, cancelling one session of a package
// is never a refund/credit, it's a forced reschedule (see handleBookingReschedule.js). This only
// handles true single-lesson bookings and the whole-package path below.
export const cancelByToken = async (token) => {
  const booking = await bookingModel.findBookingByCancelToken(token);
  if (!booking) throw Object.assign(new Error('Invalid or expired link'), { status: 400 });
  if (booking.status === 'CANCELLED') {
    throw Object.assign(new Error('This booking is already cancelled'), { status: 400 });
  }
  if (booking.sessions_required > 1) {
    throw Object.assign(
      new Error('A single session of a package cannot be cancelled — reschedule it to a new date instead'),
      { status: 400 },
    );
  }
  await bookingModel.cancelBookingRow(booking.id, 'CLIENT', null);
  return booking;
};

// Client cancel of an entire package (all N sessions at once). The 24h window is anchored to
// the earliest non-past session in the group, not the individual per-session tokens.
export const cancelGroupByToken = async (token) => {
  const group = await bookingModel.findBookingByGroupToken(token);
  if (!group) throw Object.assign(new Error('Invalid or expired link'), { status: 400 });

  const earliestExpiry = group.sessions
    .map((s) => s.cancel_token_expires_at)
    .filter(Boolean)
    .sort((a, b) => new Date(a) - new Date(b))[0];
  if (!earliestExpiry || new Date(earliestExpiry) <= new Date()) {
    throw Object.assign(
      new Error('Cancellation is only available up to 24h before the first upcoming session'),
      { status: 403 },
    );
  }

  await bookingModel.cancelGroupByToken(group.id, 'CLIENT', null);
  return group;
};

// Admin bypasses the 24h window and the package-session restriction entirely (confirmed coach
// override) — can cancel any single row, including one session of a package.
export const cancelByAdmin = async (bookingId, reason) => {
  const booking = await bookingModel.findBookingById(bookingId);
  if (!booking) throw Object.assign(new Error('Booking not found'), { status: 404 });
  if (booking.status === 'CANCELLED') {
    throw Object.assign(new Error('This booking is already cancelled'), { status: 400 });
  }
  await bookingModel.cancelBookingRow(booking.id, 'COACH', reason);
  return booking;
};

// Admin cancel of a whole package — accepts any booking id belonging to the group (parent or
// child) and resolves to the group's root id. Returns the parent row (fetched before the
// cancel UPDATE) so the controller has client/lesson/slot data to build the notification email.
export const cancelGroupByAdmin = async (bookingId, reason) => {
  const booking = await bookingModel.findBookingById(bookingId);
  if (!booking) throw Object.assign(new Error('Booking not found'), { status: 404 });
  const rootId = booking.parent_booking_id ?? booking.id;
  const parent = await bookingModel.findBookingById(rootId);
  if (parent.status === 'CANCELLED') {
    throw Object.assign(new Error('This package is already cancelled'), { status: 400 });
  }
  await bookingModel.cancelGroupByToken(rootId, 'COACH', reason);
  return parent;
};
