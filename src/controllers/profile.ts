import { Request, Response, NextFunction } from 'express';
import { ProfileRepository } from "../repositories/Profile";
import { IProfile } from "../interfaces/profile";
import { recordNotFoundHandler } from '../middlewares/recordNotFound';
import { badRequestError } from '../middlewares/badRequestError';
import { createProfileSchema } from '../validators/profile';
import { Profile } from '../entity/Profile';
import { v2 as cloudinary } from "cloudinary";
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

export class ProfileController {
  private profileRepository: ProfileRepository;

  constructor() {
    this.profileRepository = new ProfileRepository();
  }

  createProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const profile: IProfile = req.body;
      const { id } = req.user as any;
      const { username, ...rest } = await createProfileSchema.validateAsync(profile);
      const existingProfile = await Profile.findOne({ username });
      if (existingProfile) {
        badRequestError(req, res, next, 'Username already taken, Please try something else', 409)
        return;
      }

      const createdProfile = await this.profileRepository.createProfile({ ...rest, username, userId: id });
      res.status(201).json(createdProfile);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  getProfiles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const profiles = await this.profileRepository.getProfiles();
      res.status(200).json(profiles);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  getProfileById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const profile = await this.profileRepository.getProfileById(id);
      if (!profile) {
        recordNotFoundHandler(req, res, next)
        return;
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  updateProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const updatedProfile: IProfile = req.body;
      const profile = await this.profileRepository.updateProfile(id, updatedProfile);
      if (!profile) {
        recordNotFoundHandler(req, res, next)
        return;
      }
      res.status(200).json(profile);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  deleteProfile = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const profile = await this.profileRepository.deleteProfile(id);
      if (!profile) {
        recordNotFoundHandler(req, res, next)
        return;
      }
      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }

  updloadProfileImage = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id: userId } = req?.user as any;
      const profile = await this.profileRepository.getProfileByUserId(userId) as any;
      if (!profile) {
        recordNotFoundHandler(req, res, next)
        return;
      }
      if (!req.file) {
        badRequestError(req, res, next, 'Please upload an image', 400)
        return;
      }
      const uploadedImage = await cloudinary.uploader.upload(req.file.path);
      const updatedProfile = await this.profileRepository.updateProfile(profile._id, { profilePicture: uploadedImage.secure_url });
      res.status(200).json(updatedProfile);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
}