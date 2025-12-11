import { pool } from "../db/db.js";

export const createComment = async ({ text, blogId, userId }) => {
    try {
        const query = `
            INSERT INTO comments (text, blog_id, user_id)
            VALUES ($1, $2, $3)
            RETURNING *;
        `;
        const values = [text, blogId, userId];
        const result = await pool.query(query, values);
        return result.rows[0];
    } catch (error) {
        console.error('Error creating comment:', error);
        throw error;
    }
};



export const getComments = async (id) => {
    try {
        const query = `
        SELECT 
			comments.text,
            comments.comment_id,
            comments.update_date,
            comments.user_id,
            users.username
        FROM comments
        JOIN users ON comments.user_id = users.id
        WHERE comments.blog_id = $1
        `;

        const result = await pool.query(query, [id]);
        return result.rows;
    } catch (error) {
        console.error('Error getting blog:', error);
        throw error;
    }
}

export const getComment = async (id)=>{
  try {
        const query = `
         SELECT * FROM comments
            WHERE comment_id = $1
        `;

        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error getting comment:', error);
        throw error;
    }
}


export const deleteComment = async (id) => {
    try {
        const query = `
         DELETE FROM comments WHERE comment_id = $1
        `;

        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting comment:', error);
        throw error;
    }
}


export const updateComment = async (id, text) => {
    try {
        const query = `
         UPDATE comments SET text = $1, update_date = NOW() WHERE comment_id = $2
        `;

        const result = await pool.query(query, [text, id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating comment:', error);
        throw error;
    }
}