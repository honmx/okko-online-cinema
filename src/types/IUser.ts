export interface IUser {
  id: number;
  email: string;
  roles: {
    id: number;
    value: string;
    description: string;
  }[];
  isActivated: boolean;
}