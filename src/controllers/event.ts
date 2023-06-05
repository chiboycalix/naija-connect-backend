import { Request, Response, NextFunction } from 'express';
import { EventRepository } from '../repositories/Event';
import { IEvent } from '../interfaces/event';
import { badRequestError } from '../middlewares/badRequestError';
import {  createEventSchema } from '../validators/event';
import { recordNotFoundHandler } from '../middlewares/recordNotFound';
import dotenv from 'dotenv';

dotenv.config();

export class EventController {
  private eventRepository: EventRepository;

  constructor() {
    this.eventRepository = new EventRepository();
  }

  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id: createdBy } = req?.user as any;
      const { error, value } = createEventSchema.validate({ ...req.body, createdBy });
      if (error) {
        return badRequestError(req, res, next, error.message, 400);
      }
      const event: IEvent = await this.eventRepository.create(value);
      return res.status(201).json({
        message: 'Event created successfully',
        event
      });
    } catch (error) {
      next(error);
    }
  }

  findById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event: IEvent | null = await this.eventRepository.findById(req.params.id);
      if (!event) {
        return recordNotFoundHandler(req, res, next);
      }
      return res.status(200).json({
        message: 'Event found',
        event
      });
    } catch (error) {
      next(error);
    }
  }

  findAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const events: IEvent[] = await this.eventRepository.findAll();
      return res.status(200).json({
        message: 'Events found',
        events
      });
    } catch (error) {
      next(error);
    }
  }

  updateById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event: IEvent | null = await this.eventRepository.updateById(req.params.id, req.body);
      if (!event) {
        return recordNotFoundHandler(req, res, next);
      }
      return res.status(200).json({
        message: 'Event updated',
        event
      });
    } catch (error) {
      next(error);
    }
  }

  deleteById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const event: IEvent | null = await this.eventRepository.deleteById(req.params.id);
      if (!event) {
        return recordNotFoundHandler(req, res, next);
      }
      return res.status(200).json({
        message: 'Event deleted',
        event
      });
    } catch (error) {
      next(error);
    }
  }
}