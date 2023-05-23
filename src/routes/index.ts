import express from "express";
import { UserRouter } from './user';
import { RoleRouter } from './role';
import { AuthRouter } from './auth';

export class API {
  public static connect() {
    const route = express.Router();

    route.use('/users', UserRouter);
    route.use('/roles', RoleRouter);
    route.use('/auth', AuthRouter);
    return route;
  }
}