import { db } from '../config/db.js';

// find all content
export const findAllContent = async () => {
  const [rows] = await db.query(
    `SELECT * FROM site_content ORDER BY page, key_name`,
  );
  return rows;
};

// find content by page
export const findContentByPage = async (pageName) => {
  const [rows] = await db.query(
    `SELECT * FROM site_content WHERE page = ?`,
    [pageName],
  );
  return rows;
};

// find content by key
export const findContentByKey = async (keyName) => {
  const [rows] = await db.query(
    `SELECT * FROM site_content WHERE key_name = ?`,
    [keyName],
  );
  return rows[0] || null;
};

// update content
export const updateContent = async (keyName, value) => {
  const [result] = await db.query(
    `UPDATE site_content SET value = ? WHERE key_name = ?`,
    [value, keyName],
  );
  return result;
};