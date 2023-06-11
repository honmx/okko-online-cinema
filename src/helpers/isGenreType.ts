import { IGenre } from "@/types/IGenre";

export const isGenreType = (obj: any): obj is IGenre => {
  return obj.title !== undefined && obj.originalTitle !== undefined && obj.id !== undefined;
}