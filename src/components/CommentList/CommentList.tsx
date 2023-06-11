import React, { FC } from "react";
import CommentCard from "../CommentCard/CommentCard";
import { IComment } from "@/types/IComment";
import s from "./CommentList.module.scss";

interface Props {
  comments: IComment[];
  allComments: IComment[];
  movieId: number;
  className?: string;
}

const CommentList: FC<Props> = ({ comments, allComments, movieId, className }) => {
  return (
    <div className={`${s.container} ${className}`}>
      {
        comments.map(comment => <CommentCard key={comment.id} currentComment={comment} allComments={allComments} movieId={movieId} />)
      }
    </div>
  )
};

export default CommentList;
