import { IMovie } from "@/types/IMovie";

export const isMovieType = (obj: any): obj is IMovie => {
  return obj.rate !== undefined && obj.rateQuantity !== undefined;
}