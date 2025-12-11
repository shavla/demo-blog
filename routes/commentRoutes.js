import { Router } from "express";
import { verifyToken } from "../middleware/authMiddleware.js";
import { createCommentController, deleteCommentController, getCommentsController, updateCommentController } from "../zcontrollers/commentController.js";

const commentRouter = Router();

commentRouter.post("/createComment", verifyToken, createCommentController);

commentRouter.get("/getComments/:id", verifyToken, getCommentsController);

commentRouter.delete("/comment/:id", verifyToken, deleteCommentController);

commentRouter.put("/comment/:id", verifyToken, updateCommentController);

export default commentRouter;
