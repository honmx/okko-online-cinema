import React, { FC, ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters } from "@/store/slices/moviesFilterSlice";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import { IMovie } from "@/types/IMovie";
import axios from "axios";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { ParsedUrlQuery } from "querystring";
import s from "./MoviesFilter.module.scss";
import MovieList from "@/components/MovieList/MovieList";
import dynamic from "next/dynamic";
import entitiesService from "@/services/entitiesService";
import { areFiltersClear } from "@/helpers/areFiltersClear";
import AutoSuggestModal from "@/components/AutoSuggestModal/AutoSuggestModal";
import { useFilteredMovies } from "@/hooks/useFilteredMovies";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';

interface Props {
  movies: IMovie[];
}

const ClientMovieList = dynamic(() => import("../../components/MovieList/MovieList"));

const MoviesFilter: NextPageWithLayout<Props> = ({ movies }) => {

  const { t } = useTranslation("moviesPage");

  const dispatch = useAppDispatch();
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