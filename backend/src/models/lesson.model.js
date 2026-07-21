import { db } from '../config/db.js';

// Fixed catalog — 2 single lessons (Group - Adults/Kids) + 4 package rows (3-Pack/5-Pack x
// Adults/Kids, is_package=1, base_lesson_id pointing at their single-lesson counterpart). No
// admin UI creates new rows; this model only supports reading and updating catalog fields.
export const findAllLessons = async () => {
  const [rows] = await db.query(`SELECT * FROM lessons ORDER BY id ASC`);
  return rows;
};

export const findLessonById = async (id) => {
  const [rows] = await db.query(`SELECT * FROM lessons WHERE id = ?`, [id]);
  return rows[0];
};

const UPDATABLE_COLUMNS = {
  durationMinutes: 'duration_minutes',
  maxParticipants: 'max_participants',
  price: 'price',
  depositAmount: 'deposit_amount',
  level: 'level',
};

export const updateLesson = async (id, fields) => {
  const sets = [];
  const values = [];
  for (const [key, column] of Object.entries(UPDATABLE_COLUMNS)) {
    if (fields[key] !== undefined) {
      sets.push(`${column} = ?`);
      values.push(fields[key]);
    }
  }
  if (sets.length === 0) return 0;
  values.push(id);
  const [result] = await db.query(`UPDATE lessons SET ${sets.join(', ')} WHERE id = ?`, values);
  return result.affectedRows;
};
