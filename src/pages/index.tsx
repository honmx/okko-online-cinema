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
import dynamic from "next/dynamic";
import entitiesService from "@/services/entitiesService";

interface Props {
  movies: IMovie[];
}

const ClientCarousel = dynamic(() => import("../components/UI/Carousel/Carousel"), {
  ssr: false,
  loading: () => <p>loading...</p>
});

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
      <ClientCarousel title="Жанры" linkHref="/catalog" className={s.carousel}>
        {genres.map((genre) => (
          <Card key={genre.title.en} item={genre} linkHref={genre.href} ar={1} />
        ))}
      </ClientCarousel>
      <ClientCarousel title="Фильмы" linkHref="/movies" className={s.carousel}>
        {movies.filter(movie => movie.horizontalPhoto).map((movie) => (
          <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} />
        ))}
      </ClientCarousel>
      <ClientCarousel title="Фильмы 2" linkHref="/movies" className={s.carousel}>
        {movies.filter(movie => movie.horizontalPhoto).map((movie) => (
          <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} ar={1} />
        ))}
      </ClientCarousel>
      <ClientCarousel title="Фильмы 3" linkHref="/movies" className={s.carousel}>
        {movies.filter(movie => movie.verticalPhoto).map((movie) => (
          <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} ar={0.66} />
        ))}
      </ClientCarousel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const movies = await entitiesService.getMovies();

  return {
    props: {
      movies,
    },
  };
};

export default Home;