import express from "express";
import { UserController } from "../controllers/user";
import { authMiddleware } from "../middlewares/authMiddleware";

export const UserRouter = express.Router();

const userController = new UserController();

UserRouter.post("/", authMiddleware, userController.createUser);
UserRouter.get("/", authMiddleware, userController.getUsers);
UserRouter.get("/:id", authMiddleware, userController.getUserById);
UserRouter.put("/:id", authMiddleware, userController.updateUser);
UserRouter.delete("/:id",authMiddleware, userController.deleteUser);
