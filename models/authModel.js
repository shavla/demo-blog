import { pool } from "../db/db.js";

export const createUser = async (userName, email, hashedPassword) => {
    const result = await pool.query(
        `INSERT INTO users (username, email, password)
     VALUES ($1, $2, $3) RETURNING id, username, email, role`,
        [userName, email, hashedPassword]
    );
    return result.rows[0];
}


export const getUserByEmail = async (email) => {
    const result = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);
    return result.rows[0];
}

