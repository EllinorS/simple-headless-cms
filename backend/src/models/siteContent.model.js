import { db } from '../config/db.js';

export const findAllContent = async () => {
  const [rows] = await db.query(
    `SELECT * FROM site_content ORDER BY page, key_name`,
  );
  return rows;
};

export const findContentByPage = async (pageName) => {
  const [rows] = await db.query(
    `SELECT * FROM site_content WHERE page = ?`,
    [pageName],
  );
  return rows;
};

export const findContentByKey = async (keyName) => {
  const [rows] = await db.query(
    `SELECT * FROM site_content WHERE key_name = ?`,
    [keyName],
  );
  return rows[0] || null;
};

export const updateContent = async (keyName, value) => {
  const [result] = await db.query(
    `UPDATE site_content SET value = ? WHERE key_name = ?`,
    [value, keyName],
  );
  return result;
};