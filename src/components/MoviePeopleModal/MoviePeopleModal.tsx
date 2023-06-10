import React, { FC } from "react";
import s from "./MoviePeopleModal.module.scss";
import { IPerson } from "@/types/IPerson";
import Modal from "../UI/Modal/Modal";
import Title from "../UI/Title/Title";
import PersonCard from "../PersonCard/PersonCard";
import PersonAutoSuggestCard from "../PersonCard/PersonCard";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface Props {
  producers: IPerson[];
  actors: IPerson[];
  onClose: () => void;
  className?: string;
}

const MoviePeopleModal: FC<Props> = ({ producers, actors, onClose, className }) => {

  const { t, i18n } = useTranslation("moviePage");

  const router = useRouter();

  const handlePersonClick = (person: IPerson) => {
    router.push(`/person/${person.fullName}`);
  }

  return (
    <Modal onClose={onClose}>
      <Title className={s.title}>{t("moviePage:people.producers")}</Title>
      <div className={s.peopleList}>
        {
          producers.map(producer => <PersonAutoSuggestCard person={producer} onClick={handlePersonClick} />)
        }
      </div>
      <Title className={s.title}>{t("moviePage:people.actors")}</Title>
      <div className={s.peopleList}>
        {
          actors.map(actor => <PersonAutoSuggestCard person={actor} onClick={handlePersonClick} />)
        }
      </div>
    </Modal>
  )
};

export default MoviePeopleModal;
