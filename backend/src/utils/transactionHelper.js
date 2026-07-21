import { db } from '../config/db.js';

// Runs callback inside a MySQL transaction. The connection is passed to the callback
// so every query inside it uses the same connection, which transaction isolation requires.
export const withTransaction = async (callback) => {
  const connection = await db.getConnection();
  try {
    await connection.beginTransaction();
    const result = await callback(connection);
    await connection.commit();
    return result;
  } catch (err) {
    await connection.rollback();
    throw err;
  } finally {
    connection.release();
  }
};
