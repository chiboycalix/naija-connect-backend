import { UpdateQuery } from "mongoose";
import { ICategory } from "../interfaces/category";
import { Category } from "../entity/Category";

export class CategoryRepository {
  async create(category: ICategory): Promise<ICategory> {
    return await Category.create(category);
  }

  async findById(id: string): Promise<ICategory | null> {
    return await Category.findById(id);
  }

  async findAll(): Promise<ICategory[]> {
    return await Category.find({});
  }

  async updateById(id: string, category: UpdateQuery<ICategory>): Promise<ICategory | null> {
    return await Category.findByIdAndUpdate(id, category, { new: true });
  }

  async deleteById(id: string): Promise<ICategory | null> {
    return await Category.findByIdAndDelete(id);
  }
}