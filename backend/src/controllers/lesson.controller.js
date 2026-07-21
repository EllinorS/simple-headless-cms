import asyncHandler from '../utils/asyncHandler.js';
import * as lessonModel from '../models/lesson.model.js';
import { toLessonDTO } from '../utils/dto.js';

// GET /api/lessons/public : the 2 fixed lesson types, for public pricing display + slot-picker dropdown
export const getPublicLessons = asyncHandler(async (req, res) => {
  const lessons = await lessonModel.findAllLessons();
  res.json({ data: lessons.map(toLessonDTO) });
});

// GET /api/lessons : same list, admin view (identical data, no active/inactive distinction anymore)
export const getAllLessons = asyncHandler(async (req, res) => {
  const lessons = await lessonModel.findAllLessons();
  res.json({ data: lessons.map(toLessonDTO) });
});

// GET /api/lessons/:id
export const getLessonById = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const lesson = await lessonModel.findLessonById(id);
  if (!lesson) return res.status(404).json({ message: 'Lesson not found.' });
  res.json({ data: toLessonDTO(lesson) });
});

// PATCH /api/lessons/:id : updates catalog fields (price/duration/max participants/deposit/level)
// for one of the 2 fixed lesson types — no create/delete, rows are bootstrap data.
export const updateLesson = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const existing = await lessonModel.findLessonById(id);
  if (!existing) return res.status(404).json({ message: 'Lesson not found.' });
  await lessonModel.updateLesson(id, req.body);
  res.json({ message: 'Lesson updated' });
});
