import { IGenre } from "@/types/IGenre";


export const isGenreType = (obj: any): obj is IGenre => {
  return obj.genre !== undefined;
}