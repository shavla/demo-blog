import { pool } from '../db/db.js';


export const getAllUsers = async () => {
  try {
    const result = await pool.query(`SELECT * FROM users`);
    return result.rows;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

export const getUserInfo = async (id) => {
  try {
    const userRes = await pool.query('SELECT * FROM users WHERE id = $1', [id]);
    const blogsRes = await pool.query('SELECT * FROM blogs WHERE user_id = $1 ORDER BY update_date DESC', [id]);

    const user = userRes.rows[0];
    user.blogs = blogsRes.rows;
    const { password: _, ...safeUser } = user;

    return safeUser;
  } catch (error) {
    console.error('Error getting all users:', error);
    throw error;
  }
};

