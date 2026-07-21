import express from 'express';
import {
  getPublicSlots,
  getAllSlots,
  getSlotById,
  createSlot,
  updateSlot,
  cancelSlot,
  deleteSlot,
} from '../controllers/slot.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/schema.validator.js';
import { createSlotSchema, updateSlotSchema, cancelSlotSchema } from '../middlewares/schemas.js';

const router = express.Router();

// Public route
router.get('/public', getPublicSlots);

// ADMIN
router.get('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), getAllSlots);
router.get('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), getSlotById);
router.post('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(createSlotSchema), createSlot);
router.patch('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(updateSlotSchema), updateSlot);
router.patch(
  '/:id/cancel',
  authMiddleware,
  roleMiddleware('SUPER_ADMIN'),
  validate(cancelSlotSchema),
  cancelSlot,
);
router.delete('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), deleteSlot);

export default router;
