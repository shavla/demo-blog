import { Router } from "express";
import { changeBlogDetails, createBlog, deleteBlogItem, getAllBlogs, getBlogInfo } from "../zcontrollers/blogController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const blogRouter = Router();

blogRouter.post("/createblog", verifyToken, createBlog);

blogRouter.get("/blogs", verifyToken, getAllBlogs);

blogRouter.get("/blog/:id", verifyToken, getBlogInfo);

blogRouter.put("/blog/:id", verifyToken, changeBlogDetails);

blogRouter.delete("/blog/:id", verifyToken, deleteBlogItem);

export default blogRouter;
