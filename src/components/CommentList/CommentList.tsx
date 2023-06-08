import React, { FC } from "react";
import s from "./CommentList.module.scss";
import { IComment } from "@/types/IComment";
import CommentCard from "../CommentCard/CommentCard";

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
