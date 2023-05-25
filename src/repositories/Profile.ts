import { Profile } from "../entity/Profile";
import { IProfile } from "../interfaces/profile";
import { UpdateQuery } from "mongoose";

export class ProfileRepository {
  async createProfile(profile: IProfile): Promise<IProfile> {
    return await Profile.create(profile);
  }

  async getProfiles(): Promise<IProfile[]> {
    return await Profile.find({});
  }

  async getProfileById(profileId: string): Promise<IProfile | null> {
    return await Profile.findById(profileId);
  }

  async updateProfile(profileId: string, updatedProfile: UpdateQuery<IProfile>): Promise<IProfile | null> {
    return await Profile.findByIdAndUpdate(profileId, updatedProfile, { new: true });
  }

  async deleteProfile(profileId: string): Promise<any | null> {
    return await Profile.findByIdAndDelete(profileId);
  }
}