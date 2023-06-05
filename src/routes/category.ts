import express from "express";
import { CategoryController } from "../controllers/category";
import { authMiddleware } from "../middlewares/authMiddleware";

export const CategoryRouter = express.Router();

const categoryController = new CategoryController();

CategoryRouter.post("/", authMiddleware, categoryController.create);
CategoryRouter.get("/", categoryController.findAll);
CategoryRouter.get("/:id", categoryController.findById);
CategoryRouter.put("/:id", authMiddleware, categoryController.updateById);
CategoryRouter.delete("/:id", authMiddleware, categoryController.deleteById);