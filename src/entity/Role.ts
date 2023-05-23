import { IRole, ROLES } from '../interfaces/role';
import { Document, Schema, model, Model } from 'mongoose';

export interface IRoleDocument extends IRole, Document {}
export type IRoleModel = Model<IRoleDocument>;

const roleSchema = new Schema({
  name: { type: String, required: true, unique: true, enum: [ROLES.ADMIN, ROLES.USER] },
  description: { type: String, required: true },
}, { timestamps: true });

export const Role: IRoleModel = model<IRoleDocument, IRoleModel>("Role", roleSchema);