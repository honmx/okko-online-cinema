export interface IUser {
  id: number;
  email: string;
  password: string;
  roles: any[];
  isActivated: boolean;
  activationLink?: string;
}