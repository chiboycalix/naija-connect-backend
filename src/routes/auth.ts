import express from "express";
import { UserController } from "../controllers/user";

export const AuthRouter = express.Router();
const userController = new UserController();

AuthRouter.post("/login", userController.loginUser);
AuthRouter.post("/register", userController.signupUser);
