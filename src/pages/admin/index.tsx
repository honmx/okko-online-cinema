import React from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Title from "@/components/UI/Title/Title";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import { IMovie } from "@/types/IMovie";
import { IGenre } from "@/types/IGenre";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import { decline } from "@/helpers/decline";
import entitiesService from "@/services/entitiesService";
import { NextAdminPage } from "@/types/AdminPageType";
import s from "./Admin.module.scss";

interface Props {
  movies: IMovie[],
  genres: IGenre[],
}

const Admin: NextAdminPage<Props> = ({ movies, genres }) => {

  const { t, i18n } = useTranslation("adminPage");
  const lang = i18n.language as "ru" | "en";

  const isSmaller = useSmallerDevice(767);

  return (
    <>
    <Head>
      <title></title>
    </Head>
    <div className={s.adminPageContainer}>
      <Title fs={isSmaller ? "30px" : "50px"} className={s.title}>{t("adminPage:title")}</Title>
      <div className={s.linksContainer}>
        <CustomLink href="/admin/movies" className={s.link}>{`${movies.length} ${decline(t("adminPage:movie"), movies.length, "masculine", lang)}`}</CustomLink>
        <CustomLink href="/admin/genres" className={s.link}>{`${genres.length} ${decline(t("adminPage:genre"), genres.length, "masculine", lang)}`}</CustomLink>
      </div>
    </div>
    </>
  )
};

Admin.isOnlyAdmin = true;

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
        "adminPage",
        "notFoundPage"
      ])),
    }
  }
}

export default Admin;