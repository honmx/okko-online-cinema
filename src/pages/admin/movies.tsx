import React, { FC, useEffect, useState } from "react";
import s from "./AdminMovies.module.scss";
import { GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import entitiesService from "@/services/entitiesService";
import { IMovie } from "@/types/IMovie";
import Image from "next/image";
import AdminMovieCard from "@/components/AdminCard/AdminCard";
import InputField from "@/components/UI/InputField/InputField";
import { useDebounce } from "@/hooks/useDebounce";
import Card from "@/components/UI/Card/Card";
import { IGenre } from "@/types/IGenre";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import arrow from "@/assets/arrow.svg";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import { NextAdminPage } from "@/types/AdminPageType";

interface Props {
  movies: IMovie[];
}

const AdminMovies: NextAdminPage<Props> = ({ movies }) => {

  const { t } = useTranslation("adminPage");

  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>(movies);
  const [value, setValue] = useState<string>("");

  const debouncedValue = useDebounce(value);

  useEffect(() => {
    setFilteredMovies(movies.filter(movie =>
      movie.title.toLowerCase().includes(value)
      || movie.originalTitle?.toLowerCase().includes(value)));
  }, [debouncedValue]);

  const handleChange = (value: string) => {
    setValue(value.trim());
  }

  const makeUpdateRequest = async (item: IMovie | IGenre, title: string, originalTitle: string) => {
    const response = await entitiesService.updateMovie(
      item.id,
      title,
      originalTitle
    );
  }

  return (
    <div className={s.adminMoviesPageContainer}>
      <InputField type="text" value={value} placeholder={t("adminPage:placeholder")} onChange={handleChange} appearanceType="transparent" className={s.input} />
      <div className={s.moviesContainer}>
        {
          filteredMovies.map(movie => (
            <AdminMovieCard
              key={movie.id}
              item={movie}
              makeUpdateRequest={makeUpdateRequest}
            >
              <Card item={movie} linkHref={`/movie/${movie.title}`} />
            </AdminMovieCard>)
          )
        }
      </div>
      <CustomLink href="/admin/genres" className={s.moviesLink}>
        <p className={s.linkTitle}>{t("adminPage:genresLink")}</p>
        <Image src={arrow} alt="arrow" className={s.arrow} />
      </CustomLink>
    </div>
  )
};

AdminMovies.isOnlyAdmin = true;

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<Record<string, unknown>>> => {

  const movies = await entitiesService.getAdminMovies();

  return {
    props: {
      movies: movies.filter(movie => movie.horizontalPhoto),
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

export default AdminMovies;
