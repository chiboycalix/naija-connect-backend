import express from "express";
import { EventController } from "../controllers/event";
import { authMiddleware } from "../middlewares/authMiddleware";


export const EventRouter = express.Router();
const eventController = new EventController();

EventRouter.post('/', authMiddleware, eventController.create);
EventRouter.get('/:id', authMiddleware, eventController.findById);
EventRouter.get('/', authMiddleware, eventController.findAll);
EventRouter.put('/:id', authMiddleware, eventController.updateById);
EventRouter.delete('/:id', authMiddleware, eventController.deleteById);

