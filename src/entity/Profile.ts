import { Document, Schema, model, Model } from 'mongoose';
import { IProfile } from '../interfaces/profile';

export interface IProfileDocument extends IProfile, Document {}
export type IProfileModel = Model<IProfileDocument>;

const profileSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: 'User', required: true, unique: true, index: true },
  bio: { type: String, required: true },
  profilePicture: { type: String, required: true },
  phoneNumber: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  interests: [{ type: String, required: true }],
  address: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true }
  }
})

export const Profile: IProfileModel = model<IProfileDocument, IProfileModel>("Profile", profileSchema);