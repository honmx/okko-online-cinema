import { FC } from "react";
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Carousel from '@/components/UI/Carousel/Carousel';
import { GetStaticProps, NextPage } from 'next';
import { IMovie } from "@/types/IMovie";
import MovieCard from "@/components/MovieCard/MovieCard";
import s from "@/styles/Home.module.scss";
import Subscription from "@/components/Subscription/Subscription";

interface Props {
  movies: IMovie[];
}

const Home: NextPage<Props> = ({ movies }) => {

  return (
    <>
      <Head>
        <title>Главная</title>
        <meta
          name="description"
          content="Смотреть фильмы онлайн в хорошем качестве"
        />
      </Head>
      <Subscription />
      <Carousel title="Фильмы" linkHref="/movies" className={s.carousel}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </Carousel>
      <Carousel title="Фильмы 2" linkHref="/movies" className={s.carousel}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} ar={1} />
        ))}
      </Carousel>
      <Carousel title="Фильмы 3" linkHref="/movies" className={s.carousel}>
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} ar={0.66} />
        ))}
      </Carousel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await fetch('http://localhost:8080/movie');
  const result = await response.json();

  return {
    props: {
      movies: result,
    },
  };
};

export default Home;