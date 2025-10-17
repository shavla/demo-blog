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

export const getBlogs = async () => {
    try {
        const query = `
        SELECT 
            blogs.blog_id,
            blogs.user_id,
            blogs.create_date,
            blogs.title,
            users.username,
            users.email
        FROM blogs
        JOIN users ON blogs.user_id = users.id
        `
        const result = await pool.query(query);
        return result.rows;
    } catch {
        console.error('Error getting blogs:', error);
        throw error;
    }
}

export const getBlog = async (id) => {
    try {
        const query = `
         SELECT 
            blogs.blog_id,
            blogs.user_id,
            blogs.create_date,
            blogs.title,
            blogs.text,
            users.username,
            users.email
        FROM blogs
        JOIN users ON blogs.user_id = users.id
         WHERE blogs.blog_id=${id}
        `;

        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Error getting blog:', error);
        throw error;
    }
}

export const deleteBlog = async (id) => {
    try {
        const query = `
         DELETE FROM blogs WHERE blog_id = ${id}
        `;

        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}

export const updateBlog = async (id, text, title) => {
    console.log("here")

     try {
        const query = `
         UPDATE blogs SET title = '${title}', text = '${text}' WHERE blog_id = ${id}
        `;

        const result = await pool.query(query);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }

}