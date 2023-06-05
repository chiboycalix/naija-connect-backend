import { Request, Response, NextFunction } from "express";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import _ from "lodash";
import { User } from "../entity/User";
import { UserRepository } from "../repositories/User";
import { createUserSchema, loginSchema } from "../validators/user";
import { IUser } from "../interfaces/user";
import { recordNotFoundHandler } from '../middlewares/recordNotFound';
import { badRequestError } from "../middlewares/badRequestError";
import { ROLES } from "../interfaces/role";
import transporter from "../utils/emailConfig";
import { readFileSync } from "fs";
import path from "path";
import handlebars from "handlebars";
import { generalHelper } from "../utils/generalHelper";

dotenv.config();

export class UserController {
  private userRepository: UserRepository;

  constructor() {
    this.userRepository = new UserRepository();
  }

  createUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user: IUser = req.body;
      const createdUser = await this.userRepository.createUser(user);
      res.status(201).json(createdUser);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  getUsers = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const users = await this.userRepository.getUsers();
      res.status(200).json(users);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  getUserById = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const user = await this.userRepository.getUserById(id);
      if (!user) {
        recordNotFoundHandler(req, res, next);
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  updateUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const updatedUser: IUser = req.body;
      const user = await this.userRepository.updateUser(id, updatedUser);
      if (!user) {
        recordNotFoundHandler(req, res, next);
        return;
      }
      res.status(200).json(user);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  deleteUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const id = req.params.id;
      const success = await this.userRepository.deleteUser(id);
      if (!success) {
        recordNotFoundHandler(req, res, next);
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  signupUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password, firstName, lastName } =
        await createUserSchema.validateAsync(req.body);
      const existingUser = await User.findOne({ email });
      if (existingUser) {
        badRequestError(req, res, next, "Email already exists", 409);
        return;
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = await User.create({
        email,
        password: hashedPassword,
        firstName,
        lastName,
        role: ROLES.USER,
      });
      const data = _.omit(user, ["password"]);
      res
        .status(201)
        .json({ message: "User created successfully", data: user });
    } catch (error: any) {
      return next(error);
    }
  };

  loginUser = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const { email, password } = await loginSchema.validateAsync(req.body);
      const user = await User.findOne({ email });
      if (!user) {
        badRequestError(req, res, next, "Invalid email or password", 400);
        return;
      }
      const passwordMatch = await bcrypt.compare(password, user.password);
      if (!passwordMatch) {
        badRequestError(req, res, next, "Invalid email or password", 400);
        return;
      }
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!);
      res.json({ message: "Logged in successfully", token });
    } catch (error: any) {
      return next(error);
    }
  };

  signInWithGoogle = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = req.user as any;
      const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET!);
      res.json({ message: "Login successful", token });
    } catch (error) {
      return next(error);
    }
  };

  forgotPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    const templatePath = path.join(
      __dirname,
      "..",
      "templates",
      "forgotPassword.html"
    );

    const templateSource = readFileSync(templatePath, "utf-8");

    const template = handlebars.compile(templateSource);
    try {
      const user = await this.userRepository.getUserByEmail(req.body.email);
      if (!user) {
        badRequestError(req, res, next, "User not found", 404);
        return;
      }
      const resetToken: string = generalHelper.generateToken(20);

      const context = {
        name: `${user.firstName} ${user.lastName}`,
        resetLink: `${process.env.BASE_URL}/auth/reset-password?token=${resetToken}`,
      };

      const mailOptions = {
        from: process.env.EMAIL_ADDRESS,
        to: req.body.email,
        subject: "Password Reset",
        html: template(context),
      };
      transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
          console.log("Error sending email:", error);
          res.status(500).json({ message: "Error sending email" });
        } else {
          console.log("Email sent:", info.response);
          res.status(200).json({ message: "Email sent successfully" });
        }
      });
    } catch (error) {
      return next(error);
    }
  };

  resetPassword = async (
    req: Request,
    res: Response,
    next: NextFunction
  ): Promise<void> => {
    try {
      const user = await this.userRepository.getUserByEmail(req.body.email);
      if (!user) {
        badRequestError(req, res, next, "User not found", 404);
        return;
      }
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const updatedUser = await this.userRepository.updateUserByEmail(user.email, {
        password: hashedPassword,
      });
      res.status(200).json({ message: "Password reset successfully", data: updatedUser });
    } catch (error) {
      return next(error);
    }
  };
}
