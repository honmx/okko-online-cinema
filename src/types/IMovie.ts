import { IGenre } from "./IGenre";
import { IPerson } from "./IPerson";

export interface IMovie {
  id: number;
  title: string;
  originalTitle: string | null;
  ageRate: number;
  description: string;
  yearSince: number;
  yearTill: number;
  country: string;
  premierRussia: string | null;
  premier: string;
  seasons: null;
  rate: number;
  rateQuantity: number;
  horizontalPhoto: string;
  verticalPhoto: string;
  trailer: string | null;
  genres: IGenre[];
  people: IPerson[];
}