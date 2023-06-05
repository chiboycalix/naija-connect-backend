import { Document, Schema, model, Model } from 'mongoose';
import { IComment } from '../interfaces/comment';

export interface ICommentDocument extends IComment, Document {}

export type ICommentModel = Model<ICommentDocument>;

const commentSchema = new Schema({
  comment: { type: String, required: true },
  owner: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  eventId: { type: Schema.Types.ObjectId, ref: 'Post', required: true },
})

export const Comment: ICommentModel = model<ICommentDocument, ICommentModel>("Comment", commentSchema);