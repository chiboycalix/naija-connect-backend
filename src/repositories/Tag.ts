import { UpdateQuery } from "mongoose";
import { ITag } from "../interfaces/tag";
import { Tag } from "../entity/Tag";

export class TagRepository {
  async create(tag: ITag): Promise<ITag> {
    return await Tag.create(tag);
  }

  async findById(id: string): Promise<ITag | null> {
    return await Tag.findById(id);
  }

  async findAll(): Promise<ITag[]> {
    return await Tag.find({});
  }

  async updateById(id: string, tag: UpdateQuery<ITag>): Promise<ITag | null> {
    return await Tag.findByIdAndUpdate(id, tag, { new: true });
  }

  async deleteById(id: string): Promise<ITag | null> {
    return await Tag.findByIdAndDelete(id);
  }
}