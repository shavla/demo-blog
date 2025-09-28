import { Router } from "express";
import { createBlog } from "../zcontrollers/blogController.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const blogRouter = Router();

blogRouter.post("/createblog", verifyToken, createBlog);

export default blogRouter;
