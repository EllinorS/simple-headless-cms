import express from 'express';
import {
  createBooking,
  createMultipleBookings,
  getAllBookings,
  getBookingById,
  previewBooking,
  previewPackage,
  rescheduleBooking,
  cancelBooking,
  cancelPackage,
  adminReschedule,
  adminCancel,
  adminCancelGroup,
  adminMarkPaid,
} from '../controllers/booking.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/schema.validator.js';
import {
  createBookingSchema,
  createMultipleBookingSchema,
  tokenActionSchema,
  rescheduleTokenSchema,
  adminRescheduleSchema,
  adminCancelSchema,
} from '../middlewares/schemas.js';

const router = express.Router();

// Public — creation
router.post('/', validate(createBookingSchema), createBooking);
router.post('/multiple', validate(createMultipleBookingSchema), createMultipleBookings);

// Public — client self-service, token-gated (no auth: the token itself is the credential)
router.get('/cancel/preview', previewBooking);
router.post('/cancel', validate(tokenActionSchema), cancelBooking);
router.post('/reschedule', validate(rescheduleTokenSchema), rescheduleBooking);
router.get('/cancel/package/preview', previewPackage);
router.post('/cancel/package', validate(tokenActionSchema), cancelPackage);

// ADMIN
router.get('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), getAllBookings);
router.get('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), getBookingById);
router.patch(
  '/:id/reschedule',
  authMiddleware,
  roleMiddleware('SUPER_ADMIN'),
  validate(adminRescheduleSchema),
  adminReschedule,
);
router.patch(
  '/:id/cancel',
  authMiddleware,
  roleMiddleware('SUPER_ADMIN'),
  validate(adminCancelSchema),
  adminCancel,
);
router.patch(
  '/:id/cancel-group',
  authMiddleware,
  roleMiddleware('SUPER_ADMIN'),
  validate(adminCancelSchema),
  adminCancelGroup,
);
router.patch('/:id/mark-paid', authMiddleware, roleMiddleware('SUPER_ADMIN'), adminMarkPaid);

export default router;
