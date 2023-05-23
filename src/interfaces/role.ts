
export enum ROLES {
  ADMIN = 'admin',
  USER = 'user',
}

export interface IRole extends Document {
  name: string;
  description: string;
}