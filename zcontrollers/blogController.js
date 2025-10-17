import { createBlogItem, getBlogs, getBlog, deleteBlog, updateBlog } from '../models/blogsModel.js';

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

export const getAllBlogs = async (req, res) => {
    try {
        const blogs = await getBlogs();
        res.status(200).json(blogs);
    } catch (error) {
        console.error('Error fetching blogs:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const getBlogInfo = async (req, res) => {
    const { id } = req.params;
    try {
        const blog = await getBlog(id);
        res.status(200).json(blog);
    } catch {
        console.error('Error fetching blog:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const deleteBlogItem = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;      // From verifyToken middleware
    const userRole = req.user.role;

    try {
        const blog = await getBlog(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.user_id !== userId && userRole !== 'admin') {
            return res.status(403).json({ message: 'You do not have permission to delete this blog' });
        }

        await deleteBlog(id);
        res.status(200).json({ message: 'Blog deleted successfully' });
    } catch (error) {
        console.error('Error deleting blog:', error);
        res.status(500).json({ message: 'Server error' });
    }
}

export const changeBlogDetails = async (req, res) => {
    const { id } = req.params;
    const userId = req.user.userId;      // From verifyToken middleware
    const { title, text } = req.body;

    console.log(id, userId, text, title)

    try {
        const blog = await getBlog(id);

        if (!blog) {
            return res.status(404).json({ message: 'Blog not found' });
        }

        if (blog.user_id !== userId) {
            return res.status(403).json({ message: 'You do not have permission to update this blog' });
        }

        await updateBlog(id, text, title);
        res.status(200).json({ message: 'Blog updated successfully' });
    } catch (error) {
        console.error('Error updating blog:', error);
        res.status(500).json({ message: 'Server error' });
    }
}


