import { pool } from '../db/db.js';

export const getAllUsers = async (req, res) => {
    try {
        const result = await pool.query(
            `SELECT * FROM users`
        );
        // console.log(result.rows);
        res.status(200).json(result.rows)

    } catch (error) {
        res.status(400).json({ error })
    }
}