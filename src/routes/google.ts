import express from "express";
import passport from '../utils/googleAuth';

import { UserController } from "../controllers/user";

const userController = new UserController();

export const GoogleRouter = express.Router();

GoogleRouter.get("/google", passport.authenticate('google', { scope: ['profile', 'email'] }));
GoogleRouter.get('/google/callback', passport.authenticate('google', { failureRedirect: '/api/v1/auth/login' }), userController.signInWithGoogle);
