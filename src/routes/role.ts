import express from "express";
import { RoleController } from "../controllers/role";
import { authMiddleware } from "../middlewares/authMiddleware";

export const RoleRouter = express.Router();
const roleController = new RoleController();

RoleRouter.post("/", authMiddleware, roleController.createRole);
RoleRouter.get("/", authMiddleware, roleController.getRoles);
RoleRouter.get("/:id", authMiddleware, roleController.getRoleById);
RoleRouter.put("/:id", authMiddleware, roleController.updateRole);
RoleRouter.delete("/:id", authMiddleware, roleController.deleteRole);