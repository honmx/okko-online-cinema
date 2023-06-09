import React, { ReactNode, useEffect, useState } from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from 'next-i18next';
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import Card from "@/components/UI/Card/Card";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import { IMovie } from "@/types/IMovie";
import { useAppDispatch } from "@/store/hooks";
import { setSelectedMinRating, setSelectedCountry } from "@/store/slices/moviesFilterSlice";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { areFiltersClear } from "@/helpers/areFiltersClear";
import entitiesService from "@/services/entitiesService";;
import s from "./Movies.module.scss";
import Loading from "@/components/UI/Loading/Loading";

interface Props {
  movies: IMovie[];
  bestMovies: IMovie[];
  russianMovies: IMovie[];
}

const ClientCarousel = dynamic(() => import("../../components/UI/Carousel/Carousel"), {
  ssr: false,
  loading: () => <Loading />
});

const Movies: NextPageWithLayout<Props> = ({ movies, bestMovies, russianMovies }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { t } = useTranslation("moviesPage");

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
        <title>{t("moviesPage:headTitle")}</title>
        <meta
          name="description"
          content={t("moviesPage:headDescription") as string}
        />
      </Head>
      <div className={s.moviesContainer}>
        <div className={s.block}>
          <ClientCarousel
            title={t("moviesPage:bestMovies") as string}
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
            title={t("moviesPage:russianMovies") as string}
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