import express from "express";
import { CommentController } from "../controllers/comment";
import { authMiddleware } from "../middlewares/authMiddleware";

export const  CommentRouter = express.Router();
const commentController = new CommentController();

CommentRouter.post("/:eventId", authMiddleware, commentController.create);
CommentRouter.get("/:eventId", authMiddleware, commentController.findAll);
CommentRouter.get("/:id", authMiddleware, commentController.findById);
CommentRouter.put("/:id", authMiddleware, commentController.updateById);
CommentRouter.delete("/:id", authMiddleware, commentController.deleteById);