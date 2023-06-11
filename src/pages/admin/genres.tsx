import React from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import Image from "next/image";
import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import AdminMovieCard from "@/components/AdminCard/AdminCard";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import entitiesService from "@/services/entitiesService";
import { IGenre } from "@/types/IGenre";
import { IMovie } from "@/types/IMovie";
import { NextAdminPage } from "@/types/AdminPageType";
import arrow from "@/assets/arrow.svg";
import s from "./AdminGenres.module.scss";

interface Props {
  genres: IGenre[];
}

const AdminGenres: NextAdminPage<Props> = ({ genres }) => {

  const { t } = useTranslation("adminPage");

  const makeUpdateRequest = async (item: IMovie | IGenre, title: string, originalTitle: string) => {
    await entitiesService.updateGenre(
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
