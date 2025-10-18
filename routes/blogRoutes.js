import { Router } from "express";
import { createBlogController, deleteBlogController, getAllBlogsController, getBlogController, updateBlogController } from "../zcontrollers/blogController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const blogRouter = Router();

blogRouter.post("/createblog", verifyToken, createBlogController);

blogRouter.get("/blogs", verifyToken, getAllBlogsController);

blogRouter.get("/blog/:id", verifyToken, getBlogController);

blogRouter.put("/blog/:id", verifyToken, updateBlogController);

blogRouter.delete("/blog/:id", verifyToken, deleteBlogController);

export default blogRouter;
