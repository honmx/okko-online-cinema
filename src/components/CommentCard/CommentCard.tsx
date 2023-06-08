import React, { FC, FormEvent, MouseEvent, useEffect, useRef, useState } from "react";
import s from "./CommentCard.module.scss";
import { IComment } from "@/types/IComment";
import CommentList from "../CommentList/CommentList";
import Image from "next/image";
import person from "@/assets/person.svg";
import like from "@/assets/like.svg";
import check from "@/assets/check.svg";
import close from "@/assets/close.svg";
import IconButton from "../UI/IconButton/IconButton";
import InputField from "../UI/InputField/InputField";
import TextArea from "../UI/TextArea/TextArea";
import Button from "../UI/Button/Button";
import commentsService from "@/services/commentsService";
import { useAppSelector } from "@/store/hooks";

interface Props {
  currentComment: IComment;
  allComments: IComment[];
  movieId: number;
  className?: string;
}

const CommentCard: FC<Props> = ({ currentComment, allComments, movieId, className }) => {

  const ref = useRef<HTMLFormElement>(null);

  const [childrenComments, setChildrenComments] = useState<IComment[]>(allComments.filter(comment => comment.commentId === currentComment.id));

  const user = useAppSelector(state => state.auth.user);

  const [value, setValue] = useState<string>("");
  const [showForm, setShowForm] = useState<boolean>(false);

  useEffect(() => {
    if (!ref.current) return;

    const textarea = ref.current.children[0].children[0] as HTMLTextAreaElement;    
    textarea.focus();
  }, [ref.current]);

  const handleReplyClick = () => {
    setShowForm(true);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment = await commentsService.createComment(user.id, value, movieId, currentComment.id);
    setChildrenComments(prev => [...prev, newComment]);
    setShowForm(false);
    setValue("");
  }

  const handleTextAreaChange = (value: string) => {
    setValue(value);
  }

  const handleCloseFormClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setShowForm(false);
  }

  return (
    <div className={`${s.container} ${className}`}>
      <div className={s.commentInfo}>
        <div className={s.user}>
          <div className={s.imgWrapper}>
            <Image src={person} alt="user" />
          </div>
        </div>
        <p className={s.commentText}>{currentComment.comment}</p>
        <IconButton className={s.replyBtn} onClick={handleReplyClick}>
          <p>Ответить</p>
        </IconButton>
        <IconButton className={s.likeBtn}>
          <p>{currentComment.rate}</p>
          <Image src={like} alt="like" />
        </IconButton>
      </div>
      {
        showForm && user.email &&
        <form onSubmit={handleFormSubmit} ref={ref} className={s.form}>
          <TextArea value={value} onChange={handleTextAreaChange} className={s.input} />
          <div className={s.buttonsContainer}>
            <button className={s.submitBtn}>
              <Image src={check} alt="check" />
            </button>
            <button onClick={handleCloseFormClick} className={s.cancelBtn}>
              <Image src={close} alt="close" />
            </button>
          </div>
        </form>
      }
      {
        childrenComments.length > 0 &&
        <CommentList comments={childrenComments} allComments={allComments} movieId={movieId} />
      }
    </div>
  )
};

export default CommentCard;
