import React, { ReactNode } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import Carousel from "@/components/UI/Carousel/Carousel";
import Card from "@/components/UI/Card/Card";
import s from "./Movies.module.scss";
import { IMovie } from "@/types/IMovie";
import { GetStaticProps } from "next";
import axios from "axios";
import Head from "next/head";

interface Props {
  movies: IMovie[];
}

const Movies: NextPageWithLayout<Props> = ({ movies }) => {

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
          <Carousel title="Рекомендуемое" linkHref="/films/recommended" className={s.carousel}>
            {movies.map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
          </Carousel>
          <Carousel title="Новинки" linkHref="/films/new" className={s.carousel}>
            {movies.map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
          </Carousel>
          <Carousel title="Лучшее" linkHref="/films/best" className={s.carousel}>
            {movies.map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
          </Carousel>
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

  const response = await axios.get("/movie");
  const movies = response.data;

  return {
    props: {
      movies
    }
  }
}

export default Movies;