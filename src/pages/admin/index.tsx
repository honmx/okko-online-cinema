import React, { FC } from "react";
import s from "./Admin.module.scss";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import axios from "axios";
import $entitiesAPI from "@/http/entities";
import Title from "@/components/UI/Title/Title";
import Card from "@/components/UI/Card/Card";
import { IMovie } from "@/types/IMovie";
import { IGenre } from "@/types/IGenre";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import { decline } from "@/helpers/decline";
import entitiesService from "@/services/entitiesService";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  movies: IMovie[],
  genres: IGenre[],
}

const Admin: NextPage<Props> = ({ movies, genres }) => {

  console.log(movies);
  console.log(genres);

  const isSmaller = useSmallerDevice(767);

  return (
    <div className={s.adminPageContainer}>
      <Title fs={isSmaller ? "30px" : "50px"} className={s.title}>Админ-панель</Title>
      <div className={s.linksContainer}>
        <CustomLink href="/admin/movies" className={s.link}>{`${movies.length} ${decline("фильм", movies.length, "masculine")}`}</CustomLink>
        <CustomLink href="/admin/genres" className={s.link}>{`${genres.length} ${decline("жанр", genres.length, "masculine")}`}</CustomLink>
      </div>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<Record<string, unknown>>> => {

  const movies = await entitiesService.getAdminMovies();
  const genres = await entitiesService.getGenres();

  return {
    props: {
      movies,
      genres,
      ...(await serverSideTranslations(context.locale as string, [
        "common",
        "header",
        "footer",
      ])),
    }
  }
}

export default Admin;