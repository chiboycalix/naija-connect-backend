import express from "express";
import { UserRouter } from './user';
import { RoleRouter } from './role';
import { AuthRouter } from './auth';
import { ProfileRouter } from './profile';
import { EventRouter } from './event';
import { CommentRouter } from './comment';
import { TagRouter } from './tag';
import { CategoryRouter } from "./category";

export class API {
  public static connect() {
    const route = express.Router();
    route.use('/users', UserRouter);
    route.use('/roles', RoleRouter);
    route.use('/auth', AuthRouter);
    route.use('/profiles', ProfileRouter);
    route.use('/events', EventRouter);
    route.use('/comments', CommentRouter);
    route.use('/tags', TagRouter);
    route.use('/categories', CategoryRouter);
    
    return route;
  }
}