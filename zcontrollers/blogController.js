import { createBlogItem } from '../models/blogsModel.js';

export const createBlog = async (req, res) => {
    try {
        const { title, content } = req.body;
        const userId = req.user.userId;

        const newBlog = await createBlogItem({ userId, title, content });
        res.status(201).json({
            message: 'Blog created successfully',
            blog: newBlog
        });
    } catch (error) {
        console.error('Create blog error:', error);
        res.status(500).json({ message: 'Failed to create blog' });
    }
}