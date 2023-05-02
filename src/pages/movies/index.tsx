import React, { ReactNode, useEffect } from "react";
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
import { clearFilters, setMinRating, setSelectedGenre } from "@/store/slices/moviesFilterSlice";
import { IGenre } from "@/types/IGenre";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

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
    minRating,
    minCountOfRating,
    selectedProducer,
    selectedActor,
    sortBy,
  } = useSelectedFilters();

  useEffect(() => {
    dispatch(clearFilters());
  }, []);

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
            {movies.filter(movie => movie.horizontalPhoto).slice(0, 25).map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
          </ClientCarousel>
          <ClientCarousel
            title="Лучшее"
            linkHref="/movies/best"
            onClick={() => dispatch(setMinRating(8))}
            className={s.carousel}
          >
            {movies.filter(movie => movie.horizontalPhoto).filter(movie => movie.rate > 8).map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
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

  const response = await axios.get<IMovie[]>("/movie");
  const movies = response.data;

  return {
    props: {
      movies
    }
  }
}

export default Movies;