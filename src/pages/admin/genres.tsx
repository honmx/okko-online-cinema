import React, { FC } from "react";
import s from "./AdminGenres.module.scss";
import { GetStaticProps } from "next";
import entitiesService from "@/services/entitiesService";
import { IGenre } from "@/types/IGenre";

interface Props {
  genres: IGenre[];
}

const AdminGenres: FC<Props> = ({ genres }) => {
  console.log(genres);
  return (
    <div className={s.adminGenresContainer}>
      genres
    </div>
  )
};

export const getStaticProps: GetStaticProps = async () => {

  const genres = await entitiesService.getGenres();

  return {
    props: {
      genres,
    }
  }
}

export default AdminGenres;
