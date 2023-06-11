import React, { ReactElement, useEffect } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import { ParsedUrlQuery } from "querystring";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import { useAppDispatch } from "@/store/hooks";
import { IMovie } from "@/types/IMovie";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import entitiesService from "@/services/entitiesService";
import { areFiltersClear } from "@/helpers/areFiltersClear";
import { useFilteredMovies } from "@/hooks/useFilteredMovies";
import s from "./MoviesFilter.module.scss";

interface Props {
  movies: IMovie[];
}

const ClientMovieList = dynamic(() => import("../../components/MovieList/MovieList"));

const MoviesFilter: NextPageWithLayout<Props> = ({ movies }) => {

  const { t } = useTranslation("moviesPage");

  const router = useRouter();

  const {
    selectedGenre,
    selectedCountry,
    selectedMinRating,
    selectedMinCountOfRating,
    selectedProducer,
    selectedActor,
    selectedSortBy
  } = useSelectedFilters();

  const filteredMovies = useFilteredMovies(movies);

  useEffect(() => {
    if (areFiltersClear({
      selectedGenre, selectedCountry, selectedMinRating,
      selectedMinCountOfRating, selectedProducer, selectedActor, selectedSortBy
    })) router.push("/movies");
  }, [
    JSON.stringify({
      selectedGenre, selectedCountry,
      selectedMinRating, selectedMinCountOfRating,
      selectedProducer, selectedActor, selectedSortBy
    })
  ]);

  return (
    <>
      <Head>
        <title>{t("moviesPage:headTitle")}</title>
        <meta
          name="description"
          content={t("moviesPage:headDescription") as string}
        />
      </Head>
      <div className={s.moviesFilterContainer}>
        <ClientMovieList movies={filteredMovies} />
      </div>
    </>
  )
};

MoviesFilter.getLayout = (page: ReactElement) => {
  return (
    <MoviesPageLayout>{page}</MoviesPageLayout>
  )
}

interface Params extends ParsedUrlQuery {
  pageWithFilter: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {

  const movies = await entitiesService.getMovies();

  return {
    paths: movies.map(movie => ({
      params: {
        pageWithFilter: movie.title
      }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<Record<string, unknown>>> => {

  const movies = await entitiesService.getMovies();

  return {
    props: {
      movies,
      ...(await serverSideTranslations(context.locale as string, [
        "common",
        "header",
        "footer",
        "moviesPage"
      ])),
    }
  }
}

export default MoviesFilter;