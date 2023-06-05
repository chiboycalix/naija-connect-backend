import { IAddress } from "./profile";

export interface IEvent extends Document  {
  title: string;
  description: string;
  eventVenue: IAddress;
  eventDate: Date;
  eventTime: string;
  attendees: string[];
  interested: string[];
  notInterested: string[];
  comments?: string[];
  likes: number;
  dislikes: number;
  image: string;
  video: string;
  tags: string[];
  category: string;
  status: string;
  isDeleted: boolean;
  isFlagged: boolean;
  isReported: boolean;
  isBanned: boolean;
  isVerified: boolean;
  createdBy: string;
}
