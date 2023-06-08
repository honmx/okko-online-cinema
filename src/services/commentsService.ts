import $commentsAPI from "@/http/comments";
import { IComment } from "@/types/IComment";

const getMovieComments = async (movieId: number): Promise<IComment[]> => {
  try {
    const { data: comments } = await $commentsAPI.get<IComment[]>(`/movie-comment/movie/${movieId}`);
    return comments;

  } catch (error) {
    console.log(error);
    return [];
  }
}

const createComment = async (userId: number, comment: string, movieId: number, commentId?: number): Promise<IComment> => {
  try {
    const { data: newComment } = await $commentsAPI.post<IComment>("movie-comment", {
      userId,
      comment,
      movieId,
      commentId: commentId || null
    });
    return newComment;

  } catch (error) {
    console.log(error);
    console.log("aaaa");
    return {} as IComment;
  }
}

export default {
  getMovieComments,
  createComment
}