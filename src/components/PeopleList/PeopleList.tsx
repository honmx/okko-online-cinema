import React, { FC } from "react";
import s from "./PeopleList.module.scss";
import { IPerson } from "@/types/IPerson";
import CustomLink from "../UI/CustomLink/CustomLink";

interface Props {
  people: IPerson[];
  title: string;
  pluralTitle: string;
  className?: string;
}

const PeopleList: FC<Props> = ({ people, title, pluralTitle, className }) => {

  if (people.length === 0) return null;

  return (
    <div className={`${s.peopleList} ${className}`}>
      {
        <span className={s.title}>{people.length > 1 ? pluralTitle : title}:</span>
      }
      {
        people.map((person, i) => (
          <div key={person.id} className={s.linkContainer}>
            <CustomLink href={`/person/${person.fullName}`}>{person.fullName}</CustomLink>
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
