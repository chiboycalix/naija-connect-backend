import { Request, Response, NextFunction } from 'express';
import { recordNotFoundHandler } from '../middlewares/recordNotFound';
import { IRole } from "../interfaces/role";
import { RoleRepository } from "../repositories/Role";
import { createRoleSchema} from '../validators/role';

export class RoleController {
  private roleRepository: RoleRepository;

  constructor() {
    this.roleRepository = new RoleRepository();
  }

  createRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, description } = await createRoleSchema.validateAsync(req.body);
      const payload = {  name, description }
      const createdRole = await this.roleRepository.createRole({ ...payload } as IRole);
      res.status(201).json(createdRole);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  getRoles = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const roles = await this.roleRepository.getRoles();
      res.status(200).json(roles);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  getRoleById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const role = await this.roleRepository.getRoleById(id);
      if (!role) {
        recordNotFoundHandler(req, res, next)
        return;
      }
      res.status(200).json(role);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  updateRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const updatedRole: IRole = req.body;
      const role = await this.roleRepository.updateRole(id, updatedRole);
      if (!role) {
        recordNotFoundHandler(req, res, next)
        return;
      }
      res.status(200).json(role);
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };

  deleteRole = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const id = req.params.id;
      const success = await this.roleRepository.deleteRole(id);
      if (!success) {
        recordNotFoundHandler(req, res, next)
        return;
      }
      res.status(204).send();
    } catch (error) {
      console.error(error);
      return next(error);
    }
  };
}
