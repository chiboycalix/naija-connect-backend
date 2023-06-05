import { Request, Response, NextFunction } from "express";
import { TagRepository } from "../repositories/Tag";
import { ITag } from "../interfaces/tag";
import { recordNotFoundHandler } from '../middlewares/recordNotFound';
import { badRequestError } from "../middlewares/badRequestError";
import { createTagSchema } from "../validators/tag";
import dotenv from "dotenv";

dotenv.config();

export class TagController {
  private tagRepository: TagRepository;

  constructor() {
    this.tagRepository = new TagRepository();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { error, value } = createTagSchema.validate(req.body);
      if (error) {
        return badRequestError(req, res, next, error.message, 400);
      }
      const tag: ITag = await this.tagRepository.create(value);
      return res.status(201).json({
        message: "Tag created successfully",
        tag,
      });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tag: ITag | null = await this.tagRepository.findById(req.params.id);
      if (!tag) {
        return recordNotFoundHandler(req, res, next);
      }
      return res.status(200).json({
        message: "Tag found",
        tag,
      });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tags: ITag[] = await this.tagRepository.findAll();
      return res.status(200).json({
        message: "Tags found",
        tags,
      });
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tag: ITag | null = await this.tagRepository.updateById(
        req.params.id,
        req.body
      );
      if (!tag) {
        return recordNotFoundHandler(req, res, next);
      }
      return res.status(200).json({
        message: "Tag updated",
        tag,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const tag: ITag | null = await this.tagRepository.deleteById(
        req.params.id
      );
      if (!tag) {
        return recordNotFoundHandler(req, res, next);
      }
      return res.status(200).json({
        message: "Tag deleted",
        tag,
      });
    } catch (error) {
      next(error);
    }
  }
}