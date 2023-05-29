import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { IMovie } from "@/types/IMovie";
import Image from "next/image";
import { useHover } from "@/hooks/useHover";
import IconButton from "../UI/IconButton/IconButton";
import pen from "@/assets/pen.svg";
import s from "./AdminMovieCard.module.scss";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";

interface Props {
  movie: IMovie;
}

const AdminMovieCard: FC<Props> = ({ movie }) => {

  const ref = useRef<HTMLDivElement>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [title, setTitle] = useState<string>(movie.title);
  const [originalTitle, setOriginalTitle] = useState<string>(movie.originalTitle || "");

  const [inputTitle, setInputTitle] = useState<string>(movie.title);
  const [inputOriginalTitle, setInputOriginalTitle] = useState<string>(movie.originalTitle || "");

  const handleEditClick = () => {
    setIsEdit(true);
  }

  const handleTitleChange = (value: string) => {
    setInputTitle(value);
  }
  
  const handleOriginalTitleChange = (value: string) => {
    setInputOriginalTitle(value);
  }

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setTitle(inputTitle);
    setOriginalTitle(inputOriginalTitle);

    setIsEdit(false);
  }

  return (
    <div className={s.adminMovieCardContainer}>
      <div className={s.imgWrapper}>
        <Image src={movie.horizontalPhoto} alt={movie.title} width={250} height={150} className={s.img} />
      </div>
      <div className={s.rightSideContainer}>
        {
          !isEdit ? <>
            <div className={s.title}>
              <p>{title}</p>
            </div>
            {
              originalTitle &&
              <div className={s.title}>
                <p>{originalTitle}</p>
              </div>
            }
          </> : <>
            <form className={s.form} onSubmit={handleSubmit}>
              <InputField type="text" placeholder="title" value={inputTitle} onChange={handleTitleChange} />
              <InputField type="text" placeholder="originalTitle" value={inputOriginalTitle} onChange={handleOriginalTitleChange} />
              <Button value="Подтвердить" className={s.confirmBtn} />
            </form>
          </>
        }
        {
          !isEdit &&
          <IconButton onClick={handleEditClick} className={s.editBtn}>
            <Image src={pen} alt="pen" />
          </IconButton>
        }
      </div>
    </div>
  )
};

export default AdminMovieCard;
