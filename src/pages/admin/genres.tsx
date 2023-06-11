import React, { FC } from "react";
import s from "./AdminGenres.module.scss";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import entitiesService from "@/services/entitiesService";
import { IGenre } from "@/types/IGenre";
import AdminMovieCard from "@/components/AdminCard/AdminCard";
import { IMovie } from "@/types/IMovie";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import arrow from "@/assets/arrow.svg";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextAdminPage } from "@/types/AdminPageType";

interface Props {
  genres: IGenre[];
}

const AdminGenres: NextAdminPage<Props> = ({ genres }) => {

  const { t } = useTranslation("adminPage");

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
        <p className={s.linkTitle}>{t("adminPage:moviesLink")}</p>
        <Image src={arrow} alt="arrow" className={s.arrow} />
      </CustomLink>
    </div>
  )
};

AdminGenres.isOnlyAdmin = true;

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<Record<string, unknown>>> => {

  const genres = await entitiesService.getGenres();

  return {
    props: {
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

export default AdminGenres;
