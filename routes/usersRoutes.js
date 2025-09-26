import { Router } from "express";
import { getAllUsers } from "../zcontrollers/usersController.js";

const usersRouter = Router();

usersRouter.get("/users", getAllUsers);

export default usersRouter;
