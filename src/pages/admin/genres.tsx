import React, { FC } from "react";
import s from "./AdminGenres.module.scss";
import { GetStaticProps } from "next";
import entitiesService from "@/services/entitiesService";
import { IGenre } from "@/types/IGenre";
import AdminMovieCard from "@/components/AdminCard/AdminCard";
import { IMovie } from "@/types/IMovie";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import arrow from "@/assets/arrow.svg";
import Image from "next/image";

interface Props {
  genres: IGenre[];
}

const AdminGenres: FC<Props> = ({ genres }) => {

  console.log(genres);

  const makeUpdateRequest = async (item: IMovie | IGenre, title: string, originalTitle: string) => {
    const response = await entitiesService.updateGenre(
      item.id,
      title,
      originalTitle
    );
  }

  return (
    <div className={s.adminGenresContainer}>
      <div className={s.genres}>
        {
          genres.map(genre => <AdminMovieCard key={genre.id} item={genre} makeUpdateRequest={makeUpdateRequest} />)
        }
      </div>
      <CustomLink href="/admin/movies" className={s.moviesLink}>
        <p className={s.linkTitle}>Фильмы</p>
        <Image src={arrow} alt="arrow" className={s.arrow} />
      </CustomLink>
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
