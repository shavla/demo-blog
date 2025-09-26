import { pool } from '../db/db';

// const pool = new Pool(); // Automatically uses environment variables

export async function createUser(username, email, hashedPassword) {
  const result = await pool.query(
    `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3) RETURNING id, username, email, role`,
    [username, email, hashedPassword]
  );
  return result.rows[0];
}

export async function getUserByEmail(email) {
  const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
  return result.rows[0];
}