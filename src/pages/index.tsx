import { FC, useEffect } from "react";
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Carousel from '@/components/UI/Carousel/Carousel';
import { GetStaticProps, NextPage } from 'next';
import { IMovie } from "@/types/IMovie";
import Card from "@/components/UI/Card/Card";
import Subscription from "@/components/Subscription/Subscription";
// import { genres } from "@/helpers/data/genres";
import axios from "axios";
import s from "./Home.module.scss";
import dynamic from "next/dynamic";
import entitiesService from "@/services/entitiesService";
import { clearFilters, setSelectedGenre } from "@/store/slices/moviesFilterSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import authService from "@/services/authService";
import { vkLogin } from "@/store/thunks/vkLogin";
import { IGenre } from "@/types/IGenre";
import { capitalize } from "@/helpers/capitalize";
import top10 from "@/assets/top10.png";
import Top10Card from "@/components/Top10Card/Top10Card";

interface Props {
  movies: IMovie[];
  genres: IGenre[];
}

const ClientCarousel = dynamic(() => import("../components/UI/Carousel/Carousel"), {
  ssr: false,
  loading: () => <p>loading...</p>
});

const Home: NextPage<Props> = ({ movies, genres }) => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearFilters());
  }, []);

  useEffect(() => {

    const code = router.query.code as string;

    if (!code) return;

    dispatch(vkLogin(code));

    // console.log(router.query.code);
  }, [router.query]);

  const handleGenreClick = (genre: IGenre) => {
    dispatch(setSelectedGenre(capitalize(genre.title)));
  }

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
      <ClientCarousel title="Жанры" className={s.carousel}>
        {
          genres.map(genre => <Card item={genre} linkHref="/movies/filters" ar={1} onClick={() => handleGenreClick(genre)} />)
        }
      </ClientCarousel>
      <ClientCarousel image={top10} title="недели" className={s.carousel}>
        {
          movies
          .filter(movie => movie.verticalPhoto)
            .slice(0, 10)
            .map((movie, i) => <Top10Card movie={movie} number={i} />)
        }
      </ClientCarousel>
      <ClientCarousel title="Фильмы" linkHref="/movies" className={s.carousel}>
        {
          movies
            .filter(movie => movie.horizontalPhoto)
            .map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} />)
        }
      </ClientCarousel>
      <ClientCarousel title="Фильмы 2" linkHref="/movies" className={s.carousel}>
        {
          movies
            .filter(movie => movie.horizontalPhoto)
            .map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} ar={1} />)
        }
      </ClientCarousel>
      <ClientCarousel title="Фильмы 3" linkHref="/movies" className={s.carousel}>
        {
          movies
            .filter(movie => movie.verticalPhoto)
            .map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} ar={0.66} />)
        }
      </ClientCarousel>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const movies = await entitiesService.getMovies();
  const genres = await entitiesService.getGenres();

  return {
    props: {
      movies,
      genres,
    },
  };
};

export default Home;