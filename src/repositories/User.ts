import { FilterQuery, UpdateQuery } from "mongoose";
import { User } from "../entity/User";
import { IUser } from "../interfaces/user";
export class UserRepository {
  async createUser(user: IUser): Promise<IUser> {
    return await User.create(user);
  }

  async getUsers(): Promise<IUser[]> {
    return await User.find({}, '-password');
  }

  async getUserById(id: string): Promise<IUser | null> {
    return await User.findById(id).select('-password');
  }

  async updateUser(id: string, updatedUser: UpdateQuery<IUser>): Promise<IUser | null> {
    return await User.findByIdAndUpdate(id, updatedUser, { new: true }).select('-password');
  }

  async deleteUser(id: string): Promise<any | null> {
    return await User.findByIdAndDelete(id, { new: true }).select('-password');
  };

  async getUserByEmail(email: string): Promise<IUser | null> {
    return await User.findOne({ email });
  }

  async updateUserByEmail(email: string, updatedUser: any): Promise<any> {
    return await User.findOne({ email }).updateOne(updatedUser);
  }
}
