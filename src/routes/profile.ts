import express from "express";
import { ProfileController  } from "../controllers/profile";
import { authMiddleware } from "../middlewares/authMiddleware";

export const ProfileRouter = express.Router();
const profileController = new ProfileController();

ProfileRouter.post("/", authMiddleware, profileController.createProfile);
ProfileRouter.get("/", authMiddleware, profileController.getProfiles);
ProfileRouter.get("/:id", authMiddleware, profileController.getProfileById);
ProfileRouter.put("/:id", authMiddleware, profileController.updateProfile);
ProfileRouter.delete("/:id", authMiddleware, profileController.deleteProfile);