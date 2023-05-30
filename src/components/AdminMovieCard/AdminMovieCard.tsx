import React, { ChangeEvent, FC, FormEvent, useEffect, useRef, useState } from "react";
import { IMovie } from "@/types/IMovie";
import Image from "next/image";
import { useHover } from "@/hooks/useHover";
import IconButton from "../UI/IconButton/IconButton";
import pen from "@/assets/pen.svg";
import s from "./AdminMovieCard.module.scss";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import Title from "../UI/Title/Title";
import Link from "next/link";
import Card from "../UI/Card/Card";
import entitiesService from "@/services/entitiesService";

interface Props {
  movie: IMovie;
}

const AdminMovieCard: FC<Props> = ({ movie }) => {

  const ref = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLFormElement>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>(movie.title);
  const [inputOriginalTitle, setInputOriginalTitle] = useState<string>(movie.originalTitle || "");
  const [title, setTitle] = useState<string>(movie.title);
  const [originalTitle, setOriginalTitle] = useState<string>(movie.originalTitle || "");

  useEffect(() => {
    if (!isEdit) return;

    const firstInput = formRef.current?.firstElementChild?.firstElementChild as HTMLInputElement;
    firstInput.focus();
  }, [isEdit]);

  const handleEditClick = () => {
    setIsEdit(true);
  }

  const handleTitleChange = (value: string) => {
    setInputTitle(value);
  }

  const handleOriginalTitleChange = (value: string) => {
    setInputOriginalTitle(value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsEdit(false);

    if (inputTitle === title && inputOriginalTitle === originalTitle) return;

    const response = await entitiesService.updateMovie(
      movie.id,
      inputTitle,
      inputOriginalTitle
    );

    setTitle(inputTitle);
    setOriginalTitle(inputOriginalTitle);
  }

  return (
    <div className={s.adminMovieCardContainer}>
      <Card item={movie} linkHref={`/movie/${movie.title}`} />
      <div className={s.rightSideContainer}>
        {
          !isEdit ? <>
            <Title fs="14px" fw={400} className={s.title}>{title}</Title>
            {
              originalTitle &&
              <Title fs="14px" fw={400} className={s.title}>{originalTitle}</Title>
            }
          </> : <>
            <form className={s.form} onSubmit={handleSubmit} ref={formRef}>
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
