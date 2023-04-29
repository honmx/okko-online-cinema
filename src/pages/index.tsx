import { FC } from "react";
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Carousel from '@/components/UI/Carousel/Carousel';
import { GetStaticProps, NextPage } from 'next';
import { IMovie } from "@/types/IMovie";
import Card from "@/components/UI/Card/Card";
import Subscription from "@/components/Subscription/Subscription";
import { genres } from "@/helpers/data/genres";
import axios from "axios";
import s from "./Home.module.scss";

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
      <Carousel title="Жанры" linkHref="/catalog" className={s.carousel}>
        {genres.map((genre) => (
          <Card key={genre.title.en} item={genre} linkHref={genre.href} ar={1} />
        ))}
      </Carousel>
      <Carousel title="Фильмы" linkHref="/movies" className={s.carousel}>
        {movies.map((movie) => (
          <Card key={movie.id} item={movie} linkHref={movie.title} />
        ))}
      </Carousel>
      <Carousel title="Фильмы 2" linkHref="/movies" className={s.carousel}>
        {movies.map((movie) => (
          <Card key={movie.id} item={movie} linkHref={movie.title} ar={1} />
        ))}
      </Carousel>
      <Carousel title="Фильмы 3" linkHref="/movies" className={s.carousel}>
        {movies.map((movie) => (
          <Card key={movie.id} item={movie} linkHref={movie.title} ar={0.66} />
        ))}
      </Carousel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await axios.get("/movie")
  const movies = response.data;

  return {
    props: {
      movies,
    },
  };
};

export default Home;