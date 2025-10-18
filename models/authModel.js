import { pool } from "../db/db.js";

export const createUser = async (username, email, hashedPassword) => {
  try {
    const query = `
      INSERT INTO users (username, email, password)
      VALUES ($1, $2, $3)
      RETURNING id, username, email, role, created_at
    `;

    const result = await pool.query(query, [username, email, hashedPassword]);
    return result.rows[0];
  } catch (error) {
    console.error('Error creating user:', error);

    if (error.code === '23505' && error.constraint === 'users_email_key') {
      throw new Error('Email already exists');
    }

    throw error;
  }
};

export const getUserByEmail = async (email) => {
    try {
        const query = `
            SELECT *
            FROM users 
            WHERE email = $1
        `;
        const result = await pool.query(query, [email]);
        return result.rows[0];
    } catch (error) {
        console.error('Error fetching user by email:', error);
        throw error;
    }
}

