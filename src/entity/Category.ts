import { Document, Schema, model, Model } from "mongoose";
import { ICategory } from "../interfaces/category";

export interface ICategoryModel extends ICategory, Document {}

const categorySchema: Schema = new Schema({
  name: {
    type: String, required: true, unique: true
  }
})

export const Category: Model<ICategoryModel> = model<ICategoryModel>("Category", categorySchema);