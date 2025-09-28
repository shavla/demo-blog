import { pool } from "../db/db.js";

export const createBlogItem = async ({ userId, title, content }) => {
    try {
        const query = `
            INSERT INTO blogs (user_id, title, text) 
            VALUES ($1, $2, $3) 
            RETURNING blog_id, user_id, create_date, title, text
        `;
        const values = [userId, title, content];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating blog:', error);
        throw error;
    }
};