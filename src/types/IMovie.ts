import { IGenre } from "./IGenre";
import { IIMage } from "./IImage";
import { IPerson } from "./IPerson";

// поменять, как только будем забирать данные с бекенда 
export interface IMovie {
  id: number;
  title: string;
  originalTitle: string;
  ageRate: number;
  description: string;
  yearSince: number;
  yearTill: number;
  country: string;
  premierRussia: string;
  premier: string;
  seasons: null;
  rate: number;
  rateQuantity: number;
  createdAt: Date;
  updatedAt: Date;
  photo: string;
  trailer: string;
  genres: IGenre[];
  people: IPerson[];
}