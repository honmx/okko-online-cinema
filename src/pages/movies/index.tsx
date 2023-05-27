import React, { ReactNode, useEffect, useState } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import Carousel from "@/components/UI/Carousel/Carousel";
import Card from "@/components/UI/Card/Card";
import { IMovie } from "@/types/IMovie";
import { GetStaticProps } from "next";
import axios from "axios";
import Head from "next/head";
import s from "./Movies.module.scss";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters, setSelectedMinRating, setSelectedGenre, setSelectedActor } from "@/store/slices/moviesFilterSlice";
import { IGenre } from "@/types/IGenre";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { areFiltersClear } from "@/helpers/areFiltersClear";
import entitiesService from "@/services/entitiesService";
import AutoSuggestModal from "@/components/UI/AutoSuggestModal/AutoSuggestModal";

interface Props {
  movies: IMovie[];
}

const ClientCarousel = dynamic(() => import("../../components/UI/Carousel/Carousel"), {
  ssr: false,
  loading: () => <p>loading...</p>
});

const Movies: NextPageWithLayout<Props> = ({ movies }) => {

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
            title="Рекомендуемое"
            linkHref="/movies/recommended"
            className={s.carousel}
          >
            {
              movies
                .slice(0, 25)
                .map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} />)
            }
          </ClientCarousel>
          <ClientCarousel
            title="Лучшее"
            linkHref="/movies/best"
            onClick={() => dispatch(setSelectedMinRating(8))}
            className={s.carousel}
          >
            {
              movies
                .filter(movie => movie.rate > 8)
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

export const getStaticProps: GetStaticProps = async () => {

  const movies = await entitiesService.getMovies();

  return {
    props: {
      movies: movies?.filter(movie => movie.horizontalPhoto)
    }
  }
}

export default Movies;