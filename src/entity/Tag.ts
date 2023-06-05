import { Document, Schema, model, Model } from "mongoose";
import { ITag } from "../interfaces/tag";

export interface ITagModel extends ITag, Document {}

const tagSchema: Schema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

export const Tag: Model<ITagModel> = model<ITagModel>("Tag", tagSchema);
