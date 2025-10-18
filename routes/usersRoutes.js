import { Router } from "express";
import { getAllUsersController } from "../zcontrollers/usersController.js";
import { isAdmin } from "../middleware/isAdminMiddleware.js";
import { verifyToken } from "../middleware/authMiddleware.js";

const usersRouter = Router();

usersRouter.get("/users", verifyToken, isAdmin, getAllUsersController);

export default usersRouter;
