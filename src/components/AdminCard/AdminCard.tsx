import React, { FC, FormEvent, ReactNode, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import IconButton from "../UI/IconButton/IconButton";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import Title from "../UI/Title/Title";
import { IGenre } from "@/types/IGenre";
import { IMovie } from "@/types/IMovie";
import { capitalize } from "@/helpers/capitalize";
import pen from "@/assets/pen.svg";
import s from "./AdminCard.module.scss";

interface Props {
  item: IMovie | IGenre;
  makeUpdateRequest: (item: IMovie | IGenre, title: string, originalTitle: string) => Promise<void>;
  children?: ReactNode;
}

const AdminMovieCard: FC<Props> = ({ item, makeUpdateRequest, children }) => {

  const { t } = useTranslation("adminPage");

  const formRef = useRef<HTMLFormElement>(null);

  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [inputTitle, setInputTitle] = useState<string>(capitalize(item.title));
  const [inputOriginalTitle, setInputOriginalTitle] = useState<string>(capitalize(item?.originalTitle || "") || "");
  const [title, setTitle] = useState<string>(capitalize(item.title));
  const [originalTitle, setOriginalTitle] = useState<string>(capitalize(item?.originalTitle || "") || "");

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

    makeUpdateRequest(item, inputTitle, inputOriginalTitle);

    setTitle(inputTitle);
    setOriginalTitle(inputOriginalTitle);
  }

  return (
    <div className={s.adminMovieCardContainer}>
      {children}
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
              <InputField type="text" placeholder="Название" value={inputTitle} onChange={handleTitleChange} />
              <InputField type="text" placeholder="Title" value={inputOriginalTitle} onChange={handleOriginalTitleChange} />
              <Button className={s.confirmBtn}>{t("adminPage:apply")}</Button>
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
