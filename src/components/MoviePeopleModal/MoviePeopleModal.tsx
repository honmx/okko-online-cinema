import React, { FC } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import Modal from "../UI/Modal/Modal";
import Title from "../UI/Title/Title";
import PersonAutoSuggestCard from "../PersonCard/PersonCard";
import { IPerson } from "@/types/IPerson";
import s from "./MoviePeopleModal.module.scss";

interface Props {
  producers: IPerson[];
  actors: IPerson[];
  onClose: () => void;
  className?: string;
}

const MoviePeopleModal: FC<Props> = ({ producers, actors, onClose, className }) => {

  const { t } = useTranslation("moviePage");

  const router = useRouter();

  const handlePersonClick = (person: IPerson) => {
    router.push(`/person/${person.fullName}`);
  }

  return (
    <Modal onClose={onClose}>
      <Title className={s.title}>{t("moviePage:people.producers")}</Title>
      <div className={s.peopleList}>
        {
          producers.map(producer => <PersonAutoSuggestCard key={producer.id} person={producer} onClick={handlePersonClick} />)
        }
      </div>
      <Title className={s.title}>{t("moviePage:people.actors")}</Title>
      <div className={s.peopleList}>
        {
          actors.map(actor => <PersonAutoSuggestCard key={actor.id} person={actor} onClick={handlePersonClick} />)
        }
      </div>
    </Modal>
  )
};

export default MoviePeopleModal;
