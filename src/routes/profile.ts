import express from "express";
import multer from 'multer';
import { ProfileController  } from "../controllers/profile";
import { authMiddleware } from "../middlewares/authMiddleware";

export const ProfileRouter = express.Router();
const profileController = new ProfileController();
const upload = multer({ dest: 'uploads/' });

ProfileRouter.post("/", authMiddleware, profileController.createProfile);
ProfileRouter.get("/", authMiddleware, profileController.getProfiles);
ProfileRouter.get("/:id", authMiddleware, profileController.getProfileById);
ProfileRouter.put("/:id", authMiddleware, profileController.updateProfile);
ProfileRouter.delete("/:id", authMiddleware, profileController.deleteProfile);
ProfileRouter.put("/upload/:id", authMiddleware, upload.single("image"), profileController.updloadProfileImage);