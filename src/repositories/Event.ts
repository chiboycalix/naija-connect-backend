import { UpdateQuery } from "mongoose";
import { IEvent } from "../interfaces/event";
import { Event } from "../entity/Event";

export class EventRepository {
  async create(event: IEvent): Promise<IEvent> {
    return await Event.create(event);
  }

  async findById(id: string): Promise<IEvent | null> {
    return await Event.findById(id);
  }

  async findAll(): Promise<IEvent[]> {
    return await Event.find({});
  }

  async updateById(id: string, event: UpdateQuery<IEvent>): Promise<IEvent | null> {
    return await Event.findByIdAndUpdate(id, event, { new: true });
  }

  async deleteById(id: string): Promise<IEvent | null> {
    return await Event.findByIdAndDelete(id);
  }
}