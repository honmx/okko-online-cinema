export interface IPerson {
  id: number;
  fullName: string;
  fullNameOrig: string;
  createdAt: Date;
  updatedAt: Date;
  photo?: string;
  profession: string;
}