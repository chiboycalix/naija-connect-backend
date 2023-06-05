import { Request, Response, NextFunction } from "express";
import { CommentRepository } from "../repositories/Comment";
import { IComment } from "../interfaces/comment";
import { recordNotFoundHandler } from '../middlewares/recordNotFound';
import { badRequestError } from "../middlewares/badRequestError";
import { createCommentSchema } from "../validators/comment";
import dotenv from "dotenv";

dotenv.config();

export class CommentController {
  private commentRepository: CommentRepository;

  constructor() {
    this.commentRepository = new CommentRepository();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    const { id: owner } = req?.user as any;
    const eventId = req.params.eventId;
    try {
      const { error, value } = createCommentSchema.validate({
        ...req.body,
        owner,
        eventId,
      });
      if (error) {
        return badRequestError(req, res, next, error.message, 400);
      }
      const comment: IComment = await this.commentRepository.create(value);
      return res.status(201).json({
        message: "Comment created successfully",
        comment,
      });
    } catch (error) {
      next(error);
    }
  };

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment: IComment | null = await this.commentRepository.findById(
        req.params.id
      );
      if (!comment) {
        return recordNotFoundHandler(req, res, next);
      }
      return res.status(200).json({
        message: "Comment found",
        comment,
      });
    } catch (error) {
      next(error);
    }
  };

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    const eventId = req.params.eventId;
    try {
      const comments: IComment[] = await this.commentRepository.findAll(eventId);
      return res.status(200).json({
        message: "Comments found",
        comments,
      });
    } catch (error) {
      next(error);
    }
  };

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment: IComment | null = await this.commentRepository.findById(
        req.params.id
      );
      if (!comment) {
        return recordNotFoundHandler(req, res, next);
      }
      const updatedComment: IComment | null =
        await this.commentRepository.updateById(req.params.id, req.body);
      return res.status(200).json({
        message: "Comment updated successfully",
        updatedComment,
      });
    } catch (error) {
      next(error);
    }
  };

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const comment: IComment | null = await this.commentRepository.findById(
        req.params.id
      );
      if (!comment) {
        return recordNotFoundHandler(req, res, next);
      }
      const deletedComment: IComment | null =
        await this.commentRepository.deleteById(req.params.id);
      return res.status(200).json({
        message: "Comment deleted successfully",
        deletedComment,
      });
    } catch (error) {
      next(error);
    }
  };
}
