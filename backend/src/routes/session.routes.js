import express from 'express';
import {
  createSession,
  getAllSessions,
  getPublicSessions,
  deleteSession,
} from '../controllers/session.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/schema.validator.js';
import { createSessionSchema } from '../middlewares/schemas.js';

const router = express.Router();

// Public route
router.get('/public', getPublicSessions);

 // ADMIN
router.get('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), getAllSessions);
router.post('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(createSessionSchema), createSession);
router.delete('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), deleteSession);

export default router;
