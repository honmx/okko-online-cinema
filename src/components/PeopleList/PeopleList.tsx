import React, { FC } from "react";
import { useTranslation } from "next-i18next";
import CustomLink from "../UI/CustomLink/CustomLink";
import { IPerson } from "@/types/IPerson";
import s from "./PeopleList.module.scss";

interface Props {
  people: IPerson[];
  title: string;
  pluralTitle: string;
  className?: string;
}

const PeopleList: FC<Props> = ({ people, title, pluralTitle, className }) => {

  const { i18n } = useTranslation("moviePage");
  const lang = i18n.language;

  if (people.length === 0) return null;

  return (
    <div className={`${s.peopleList} ${className}`}>
      <span className={s.title}>{people.length > 1 ? pluralTitle : title}:</span>
      {
        people.map((person, i) => (
          <div key={person.id} className={s.linkContainer}>
            <CustomLink href={`/person/${person.fullName}`}>{lang === "en" && person.fullNameOrig ? person.fullNameOrig : person.fullName}</CustomLink>
            {
              i !== people.length - 1 &&
              <span>,</span>
            }
          </div>
        ))
      }
    </div>
  )
};

export default PeopleList;
