import { Document, Schema, model, Model } from "mongoose";
import { IEvent } from "../interfaces/event";

export interface IEventDocument extends IEvent, Document {}

export type IEventModel = Model<IEventDocument>;

enum EventStatus {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  ENDED = "ENDED",
  CANCELLED = "CANCELLED",
  POSTPONED = "POSTPONED",
  RESCHEDULED = "RESCHEDULED",
  DELAYED = "DELAYED",
}

const eventSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  eventVenue: {
    street: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    country: { type: String, required: true },
    geoLocation: {
      lat: { type: Number, required: true },
      lng: { type: Number, required: true },
    },
  },
  eventDate: { type: Date, required: true },
  eventTime: { type: String, required: true },
  attendees: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  interested: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  notInterested: [{ type: Schema.Types.ObjectId, ref: "User", required: true }],
  comments: [{ type: Schema.Types.ObjectId, ref: "Comment", required: true }],
  likes: { type: Number, required: true },
  dislikes: { type: Number, required: true },
  image: { type: String, required: true },
  video: { type: String, required: true },
  tags: [{ type: Schema.Types.ObjectId, required: true, ref: "Tag" }],
  category: { type: Schema.Types.ObjectId, required: true, ref: "Category" },
  status: { type: String, required: true, enum: EventStatus },
  isDeleted: { type: Boolean, required: true, default: false },
  isFlagged: { type: Boolean, required: true, default: false },
  isReported: { type: Boolean, required: true, default: false },
  isBanned: { type: Boolean, required: true, default: false },
  isVerified: { type: Boolean, required: true, default: false },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Event: IEventModel = model<IEventDocument, IEventModel>(
  "Event",
  eventSchema
);
