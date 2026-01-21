import { pool } from "../db/db.js";

export const createBlog = async ({ userId, title, content }) => {
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

export const getAllBlogs = async () => {
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

export const getPaginatedBlogs = async (page = 1, limit = 10) => {
    try {
        const offset = (page - 1) * limit;

        const blogsQuery = `
        SELECT * FROM blogs
        ORDER BY update_date DESC
        LIMIT $1 OFFSET $2
        `;

        const countQuery = `
        SELECT COUNT(*) FROM blogs
        `;

        const [blogsResult, countResult] = await Promise.all([
            pool.query(blogsQuery, [limit, offset]),
            pool.query(countQuery),
        ]);

        return {
            blogs: blogsResult.rows,
            totalCount: Number(countResult.rows[0].count)
        };

    } catch (error) {
        console.error("Error getting blogs:", error);
        throw error;
    }
};

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
        WHERE blogs.blog_id = $1
        `;

        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error getting blog:', error);
        throw error;
    }
}

export const searchBlogs = async (title) => {
    try {
        const query = `
            SELECT blog_id, title, create_date
            FROM blogs
            WHERE title ILIKE $1
            ORDER BY create_date DESC
        `;
        const searchText = `%${title}%`;

        const result = await pool.query(query, [searchText]);
        return result.rows;
    } catch (error) {
        console.error("Error searching blogs:", error);
        throw error;
    }
}

export const deleteBlog = async (id) => {
    try {
        const query = `
         DELETE FROM blogs WHERE blog_id = $1
        `;

        const result = await pool.query(query, [id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error deleting blog:', error);
        throw error;
    }
}

export const updateBlog = async (id, text, title) => {
    try {
        const query = `
         UPDATE blogs SET title = $1, text = $2, update_date = NOW() WHERE blog_id = $3
        `;

        const result = await pool.query(query, [title, text, id]);
        return result.rows[0];
    } catch (error) {
        console.error('Error updating blog:', error);
        throw error;
    }
}