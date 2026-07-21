import asyncHandler from '../utils/asyncHandler.js';
import * as slotModel from '../models/slot.model.js';
import * as lessonModel from '../models/lesson.model.js';
import * as bookingModel from '../models/booking.model.js';
import { toSlotDTO } from '../utils/dto.js';

// GET /api/slots/public : upcoming, non-cancelled slots only
export const getPublicSlots = asyncHandler(async (req, res) => {
  const slots = await slotModel.findPublicSlots();
  res.json({ data: slots.map(toSlotDTO) });
});

// GET /api/slots : all slots including past/cancelled (admin schedule view)
export const getAllSlots = asyncHandler(async (req, res) => {
  const slots = await slotModel.findAllSlots();
  res.json({ data: slots.map(toSlotDTO) });
});

// GET /api/slots/:id
export const getSlotById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const slot = await slotModel.findSlotById(id);
  if (!slot) return res.status(404).json({ message: 'Slot not found.' });
  res.json({ data: toSlotDTO(slot) });
});

// POST /api/slots — price/duration/max/deposit are sent as-is from the frontend (pre-filled
// from the lesson's catalog defaults there, but editable per slot before submit).
export const createSlot = asyncHandler(async (req, res) => {
  const lesson = await lessonModel.findLessonById(req.body.lessonId);
  if (!lesson) return res.status(404).json({ message: 'Lesson type not found.' });
  try {
    const slotId = await slotModel.createSlot(req.body);
    res.status(201).json({ message: 'Slot created', data: { id: slotId } });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      throw Object.assign(
        new Error('A slot already exists for this lesson at this date and time.'),
        { status: 409 },
      );
    }
    throw err;
  }
});

// PATCH /api/slots/:id
export const updateSlot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await slotModel.findSlotRawById(id);
  if (!existing) return res.status(404).json({ message: 'Slot not found.' });
  try {
    await slotModel.updateSlot(id, req.body);
    res.json({ message: 'Slot updated' });
  } catch (err) {
    if (err.code === 'ER_DUP_ENTRY') {
      throw Object.assign(
        new Error('A slot already exists for this lesson at this date and time.'),
        { status: 409 },
      );
    }
    throw err;
  }
});

// PATCH /api/slots/:id/cancel
export const cancelSlot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { cancelReason } = req.body;
  const existing = await slotModel.findSlotRawById(id);
  if (!existing) return res.status(404).json({ message: 'Slot not found.' });
  await slotModel.cancelSlot(id, cancelReason);
  res.json({ message: 'Slot cancelled' });
});

// DELETE /api/slots/:id : hard delete — rejected with 409 if the slot has active bookings,
// since deleting it out from under them would orphan those booking rows (dangling slot_id).
export const deleteSlot = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await slotModel.findSlotRawById(id);
  if (!existing) return res.status(404).json({ message: 'Slot not found.' });
  const activeBookings = await bookingModel.countActiveBookingsBySlot(id);
  if (activeBookings > 0) {
    return res.status(409).json({ message: 'Cannot delete a slot with active bookings. Cancel the slot instead.' });
  }
  await slotModel.deleteSlotById(id);
  res.status(204).send();
});
