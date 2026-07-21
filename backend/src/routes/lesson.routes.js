import express from 'express';
import {
  getPublicLessons,
  getAllLessons,
  getLessonById,
  updateLesson,
} from '../controllers/lesson.controller.js';
import { authMiddleware } from '../middlewares/auth.middleware.js';
import { roleMiddleware } from '../middlewares/role.middleware.js';
import { validate } from '../middlewares/schema.validator.js';
import { updateLessonSchema } from '../middlewares/schemas.js';

const router = express.Router();

// Public route
router.get('/public', getPublicLessons);

// ADMIN — no create/delete: the 2 lesson types are fixed bootstrap rows, only their catalog fields change
router.get('/', authMiddleware, roleMiddleware('SUPER_ADMIN'), getAllLessons);
router.get('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), getLessonById);
router.patch('/:id', authMiddleware, roleMiddleware('SUPER_ADMIN'), validate(updateLessonSchema), updateLesson);

export default router;
