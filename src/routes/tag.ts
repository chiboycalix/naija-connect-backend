import express from "express";
import { authMiddleware } from "../middlewares/authMiddleware";
import { TagController } from "../controllers/tag";


export const TagRouter = express.Router();

const tagController = new TagController();

TagRouter.post('/', authMiddleware, tagController.create);
TagRouter.get('/:id', authMiddleware, tagController.findById);
TagRouter.get('/', authMiddleware, tagController.findAll);
TagRouter.put('/:id', authMiddleware, tagController.updateById);
TagRouter.delete('/:id', authMiddleware, tagController.deleteById);
