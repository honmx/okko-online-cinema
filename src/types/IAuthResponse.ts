import { IUser } from "./IUser";

export interface IAuthResponse {
  accessToken: string;
  refreshToken: string;
  user: IUser;
  roles: {
    id: number;
    value: string;
    description: string;
  }[];
}