import React, { FC } from "react";
import { IPerson } from "@/types/IPerson";
import Image from "next/image";
import personIcon from "@/assets/person.svg"; 
import s from "./PersonAutoSuggestCard.module.scss";

interface Props {
  person: IPerson;
  className?: string;
  onClick: (person: IPerson) => void;
}

const PersonAutoSuggestCard: FC<Props> = ({ person, className, onClick }) => {

  const handlePersonClick = () => {
    onClick(person);
  }

  return (
    <div className={`${s.container} ${className}`} onClick={handlePersonClick}>
      <div className={s.imgWrapper}>
        <Image src={person.photo ? person.photo : personIcon} alt="person" width={30} height={45} className={s.photo} />
      </div>
      <div className={s.textContainer}>
        <p className={s.name}>{person.fullName}</p>
        <p className={s.profession}>{person.profession}</p>
      </div>
    </div>
  )
};

export default PersonAutoSuggestCard;
