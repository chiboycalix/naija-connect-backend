import express from "express";
import mongoose from "mongoose";
import dotenv from 'dotenv';
import chalk from 'chalk';
import cors from 'cors';
import morgan from 'morgan';
import { API } from './routes';
import { resourceNotFoundHandler } from './middlewares/resourceNotFoundHandler'
import { errorHandler } from './middlewares/errorHandler';
import passport from './utils/googleAuth';
import session from 'express-session';
import { GoogleRouter } from "./routes/google";

dotenv.config()
const route = express.Router();
const app = express();
const PORT = process.env.PORT || 2000;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017/naija-connect";

app.use(session({ secret: 'YOUR_SESSION_SECRET', resave: true, saveUninitialized: true }));
app.use(cors());
app.use(passport.initialize());
app.use(passport.session());
const logger = morgan((tokens, req, res) => {
  return [
    chalk.hex('#f5a142').bold(tokens.method(req, res)),
    chalk.hex('#4286f5').bold(tokens.url(req, res)),
    chalk.hex('#42f55e')(tokens['response-time'](req, res) + ' ms'),
    chalk.yellow(tokens.status(req, res)),
    chalk.gray(`from ${tokens['user-agent'](req, res)}`),
  ].join(' ');
});

// Use logger middleware
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Use API router
app.use("/api/v1", API.connect());
app.use("/auth", GoogleRouter);

if(process.env.NODE_ENV !== "test"){
  mongoose
  .connect(MONGODB_URI, { })
  .then(() => {
    console.log("Connected to MongoDB!");
    app.listen(PORT, () => {
      console.log(chalk.hex('#3c3').bold(`Server listening on port ${PORT}`));
    });
  })
  .catch((err) => {
    console.error(err);
  });
}

app.use(resourceNotFoundHandler)
app.use('*', errorHandler)

export default app;