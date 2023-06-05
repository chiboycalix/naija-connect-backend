import { Request, Response, NextFunction } from "express";
import { CategoryRepository } from "../repositories/Category";
import { ICategory } from "../interfaces/category";
import { recordNotFoundHandler } from '../middlewares/recordNotFound';
import { badRequestError } from "../middlewares/badRequestError";
import { createCategorySchema } from "../validators/category";
import dotenv from "dotenv";

dotenv.config();

export class CategoryController {
  private categoryRepository: CategoryRepository;

  constructor() {
    this.categoryRepository = new CategoryRepository();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = createCategorySchema.validate(req.body);
      if (error) {
        return badRequestError(req, res, next, error.message, 400);
      }
      const category: ICategory = await this.categoryRepository.create(value);
      return res.status(201).json({
        message: "Category created successfully",
        category,
      });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category: ICategory | null = await this.categoryRepository.findById(
        req.params.id
      );
      if (!category) {
        return recordNotFoundHandler(req, res, next);
      }
      return res.status(200).json({
        message: "Category found",
        category,
      });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const categories: ICategory[] = await this.categoryRepository.findAll();
      return res.status(200).json({
        message: "Categories found",
        categories,
      });
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category: ICategory | null = await this.categoryRepository.findById(
        req.params.id
      );
      if (!category) {
        return recordNotFoundHandler(req, res, next);
      }
      const updatedCategory: ICategory | null = await this.categoryRepository.updateById(
        req.params.id,
        req.body
      );
      return res.status(200).json({
        message: "Category updated successfully",
        updatedCategory,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const category: ICategory | null = await this.categoryRepository.findById(
        req.params.id
      );
      if (!category) {
        return recordNotFoundHandler(req, res, next);
      }
      await this.categoryRepository.deleteById(req.params.id);
      return res.status(200).json({
        message: "Category deleted successfully",
      });
    } catch (error) {
      next(error);
    }
  }
}