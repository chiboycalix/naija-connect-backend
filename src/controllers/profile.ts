import { Request, Response, NextFunction } from 'express';
import { ProfileRepository } from "../repositories/Profile";
import { IProfile } from "../interfaces/profile";
import { resourceNotFoundHandler } from '../middlewares/resourceNotFoundHandler';
import { badRequestError } from '../middlewares/badRequestError';
import { createProfileSchema } from '../validators/profile';
import { Profile } from '../entity/Profile';

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
        resourceNotFoundHandler(req, res, next)
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
        resourceNotFoundHandler(req, res, next)
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
        resourceNotFoundHandler(req, res, next)
        return;
      }
      res.status(200).json({ message: 'Profile deleted successfully' });
    } catch (error) {
      console.error(error);
      return next(error);
    }
  }
}