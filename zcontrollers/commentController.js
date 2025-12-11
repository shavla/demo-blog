import { createComment, deleteComment, getComment, getComments, updateComment } from "../models/commentModel.js";

export const createCommentController = async (req, res) => {
  try {
    const { text, blogId } = req.body;
    const userId = req.user.userId;

    const comment = await createComment({ text, blogId, userId });
    res.status(201).json({
      message: "Comment created successfully",
      comment,
    });
  } catch (err) {
    console.error("Error creating comment:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getCommentsController = async (req, res) => {
  const { id } = req.params;
  try {
    const blog = await getComments(id);
    res.status(200).json(blog);
  } catch {
    console.error('Error fetching blog:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

export const deleteCommentController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;

  try {
    const comment = await getComment(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user_id !== userId) {
      return res.status(403).json({ message: 'You do not have permission to delete this comment' });
    }

    await deleteComment(id);
    res.status(200).json({ message: 'Comment deleted successfully' });
  } catch (error) {
    console.error('Error deleting comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
};



export const updateCommentController = async (req, res) => {
  const { id } = req.params;
  const userId = req.user.userId;
  const { text } = req.body;

  try {
    const comment = await getComment(id);

    if (!comment) {
      return res.status(404).json({ message: 'Comment not found' });
    }

    if (comment.user_id !== userId) {
      return res.status(403).json({ message: 'You do not have permission to update this comment' });
    }

    await updateComment(id, text);
    res.status(200).json({ message: 'Comment updated successfully' });
  } catch (error) {
    console.error('Error updating comment:', error);
    res.status(500).json({ message: 'Server error' });
  }
}
