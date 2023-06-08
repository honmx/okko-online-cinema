export interface IComment {
  id: number;
  userId: number;
  movieId: number;
  comment: string;
  commentId: number | null;
  rate: number;
}