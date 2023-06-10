import React, { ReactNode, useEffect, useState } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import Carousel from "@/components/UI/Carousel/Carousel";
import Card from "@/components/UI/Card/Card";
import { IMovie } from "@/types/IMovie";
import { GetStaticProps, GetStaticPropsResult } from "next";
import axios from "axios";
import Head from "next/head";
import s from "./Movies.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters, setSelectedMinRating, setSelectedGenre, setSelectedActor, setSelectedCountry } from "@/store/slices/moviesFilterSlice";
import { IGenre } from "@/types/IGenre";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { areFiltersClear } from "@/helpers/areFiltersClear";
import entitiesService from "@/services/entitiesService";;
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  movies: IMovie[];
  bestMovies: IMovie[];
  russianMovies: IMovie[];
}

const ClientCarousel = dynamic(() => import("../../components/UI/Carousel/Carousel"), {
  ssr: false,
  loading: () => <p>loading...</p>
});

const Movies: NextPageWithLayout<Props> = ({ movies, bestMovies, russianMovies }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    selectedGenre,
    selectedCountry,
    selectedMinRating,
    selectedMinCountOfRating,
    selectedProducer,
    selectedActor,
    selectedSortBy,
  } = useSelectedFilters();

  useEffect(() => {
    if (areFiltersClear({
      selectedGenre, selectedCountry, selectedMinRating,
      selectedMinCountOfRating, selectedProducer, selectedActor, selectedSortBy
    })) return;

    router.push("/movies/filters");
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
        <title>Фильмы</title>
        <meta
          name="description"
          content="Смотреть фильмы онлайн в хорошем качестве"
        />
      </Head>
      <div className={s.moviesContainer}>
        <div className={s.block}>
          <ClientCarousel
            title="Лучшее"
            linkHref="/movies/filters"
            onTitleClick={() => dispatch(setSelectedMinRating(8.8))}
            className={s.carousel}
          >
            {
              bestMovies
                .map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} />)
            }
          </ClientCarousel>
          <ClientCarousel
            title="Российские Фильмы"
            linkHref="/movies/filters"
            onTitleClick={() => dispatch(setSelectedCountry("Россия"))}
            className={s.carousel}
          >
            {
              russianMovies
                .map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} />)
            }
          </ClientCarousel>
        </div>
      </div>
    </>
  )
};

Movies.getLayout = (page: ReactNode) => {
  return (
    <MoviesPageLayout>{page}</MoviesPageLayout>
  )
}

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<Record<string, unknown>>> => {

  const movies = await entitiesService.getMovies();

  const bestMovies = await entitiesService.getMoviesByMinRating(8.8);
  const russianMovies = await entitiesService.getMoviesByCountry("Россия");

  return {
    props: {
      movies: movies.filter(movie => movie.horizontalPhoto),
      bestMovies: bestMovies.filter(movie => movie.horizontalPhoto),
      russianMovies: russianMovies.filter(movie => movie.horizontalPhoto),
      ...(await serverSideTranslations(context.locale as string, [
        "common",
        "header",
        "footer",
        "moviesPage"
      ])),
    }
  }
}

export default Movies;