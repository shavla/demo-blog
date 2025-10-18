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