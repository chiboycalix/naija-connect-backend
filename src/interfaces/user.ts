import { ROLES } from "./role";


export interface IUser extends Document {
  firstName: string;
  lastName: string;
  email: string;
  role: ROLES;
  password: string;
}
