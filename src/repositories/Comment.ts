import { UpdateQuery } from "mongoose";
import { IComment } from "../interfaces/comment";
import { Comment } from "../entity/Comment";

export class CommentRepository {
  async create(comment: IComment): Promise<IComment> {
    return await Comment.create(comment);
  }

  async findById(id: string): Promise<IComment | null> {
    return await Comment.findById(id);
  }

  async findAll(eventId: any): Promise<IComment[]> {
    return await Comment.find({ eventId });
  }

  async updateById(id: string, comment: UpdateQuery<IComment>): Promise<IComment | null> {
    return await Comment.findByIdAndUpdate(id, comment, { new: true });
  }

  async deleteById(id: string): Promise<IComment | null> {
    return await Comment.findByIdAndDelete(id);
  }
}