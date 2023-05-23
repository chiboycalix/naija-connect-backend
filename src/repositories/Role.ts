import { UpdateQuery } from "mongoose";
import { Role } from "../entity/Role";
import { IRole } from "../interfaces/role";
export class RoleRepository {
  async createRole(role: IRole): Promise<IRole> {
    return await Role.create(role);
  }

  async getRoles(): Promise<IRole[]> {
    return await Role.find();
  }

  async getRoleById(id: string): Promise<IRole | null> {
    return await Role.findById(id);
  }

  async updateRole(id: string, updatedRole: UpdateQuery<IRole>): Promise<IRole | null> {
    return await Role.findByIdAndUpdate(id, updatedRole, { new: true });
  }

  async deleteRole(id: string): Promise<any | null> {
    return await Role.findByIdAndDelete(id, { new: true });
  };
}
