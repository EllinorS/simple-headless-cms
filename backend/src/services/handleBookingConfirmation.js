import * as bookingModel from '../models/booking.model.js';

// Admin marks a booking (or a whole package, resolved via parent_booking_id) as paid once
// the bank transfer has landed. Also the seam a future Stripe webhook would call instead of
// a human clicking "Mark as paid".
export const confirmByAdmin = async (bookingId) => {
  const booking = await bookingModel.findBookingById(bookingId);
  if (!booking) throw Object.assign(new Error('Booking not found'), { status: 404 });
  const rootId = booking.parent_booking_id ?? booking.id;
  const parent = await bookingModel.findBookingById(rootId);
  if (parent.status !== 'PENDING') {
    throw Object.assign(new Error('This booking is not awaiting payment'), { status: 400 });
  }
  await bookingModel.confirmBookingGroup(rootId);
  return parent;
};
