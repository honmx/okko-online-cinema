import { FC, useEffect } from "react";
import { Inter } from 'next/font/google';
import Head from 'next/head';
import Carousel from '@/components/UI/Carousel/Carousel';
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next';
import { IMovie } from "@/types/IMovie";
import Card from "@/components/UI/Card/Card";
import Subscription from "@/components/Subscription/Subscription";
// import { genres } from "@/helpers/data/genres";
import axios from "axios";
import s from "./Home.module.scss";
import dynamic from "next/dynamic";
import entitiesService from "@/services/entitiesService";
import { clearFilters, setSelectedCountry, setSelectedGenre } from "@/store/slices/moviesFilterSlice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/router";
import authService from "@/services/authService";
import { vkLogin } from "@/store/thunks/vkLogin";
import { IGenre } from "@/types/IGenre";
import { capitalize } from "@/helpers/capitalize";
import top10 from "@/assets/top10.png";
import Top10Card from "@/components/Top10Card/Top10Card";
import Loading from "@/components/UI/Loading/Loading";
import TrailerCarousel from "@/components/UI/TrailerCarousel/TrailerCarousel";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";

interface Props {
  movies: IMovie[];
  genres: IGenre[];
  top10Movies: IMovie[];
  USSRMovies: IMovie[];
  cartoons: IMovie[];
}

const ClientCarousel = dynamic(() => import("../components/UI/Carousel/Carousel"), {
  ssr: false,
  loading: () => <Loading />
});

const Home: NextPage<Props> = ({ movies, genres, top10Movies, USSRMovies, cartoons }) => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(clearFilters());
  }, []);

  useEffect(() => {
    const code = router.query.code as string;

    if (!code) return;

    dispatch(vkLogin(code));
  }, [router.query]);

  const handleGenreClick = (genre: IGenre) => {
    dispatch(setSelectedGenre(capitalize(genre.title)));
  }

  const handleUSSRMoviesClick = () => {
    dispatch(setSelectedCountry("СССР"));
  }

  const handleCartoonsClick = () => {
    dispatch(setSelectedGenre("Мультфильм"));
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
      <TrailerCarousel movies={
        top10Movies
          .slice(0, 15)
          .filter(movie => movie.horizontalPhoto)} className={s.carousel}
      />
      <Subscription />
      <ClientCarousel title="Жанры" className={s.carousel}>
        {
          genres.map(genre => (
            <Card
              key={genre.id}
              item={genre}
              linkHref="/movies/filters"
              ar={1}
              onClick={() => handleGenreClick(genre)}
            />)
          )
        }
      </ClientCarousel>
      <ClientCarousel image={top10} title="недели" className={s.carousel}>
        {
          top10Movies
            .map((movie, i) => <Top10Card key={movie.id} movie={movie} number={i} />)
        }
      </ClientCarousel>
      <ClientCarousel title="Советские фильмы" linkHref="/movies/filters" onTitleClick={handleUSSRMoviesClick} className={s.carousel}>
        {
          USSRMovies
            .filter(movie => movie.horizontalPhoto)
            .map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} />)
        }
      </ClientCarousel>
      <ClientCarousel title="Мультфильмы" linkHref="/movies/filters" onTitleClick={handleCartoonsClick} className={s.carousel}>
        {
          cartoons
            .filter(movie => movie.horizontalPhoto)
            .map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} ar={1} />)
        }
      </ClientCarousel>
    </>
  );
}

export const getStaticProps = async ({ locale }: { locale: string }): Promise<GetStaticPropsResult<Record<string, unknown>>> => {
  // const movies = await entitiesService.getMovies();
  const genres = await entitiesService.getGenres();

  const top10Movies = await entitiesService.getTop10Movies();
  const USSRMovies = await entitiesService.getMoviesByCountry("СССР");
  const cartoons = await entitiesService.getMoviesByGenre("мультфильм");

  return {
    props: {
      // movies,
      genres,
      top10Movies,
      USSRMovies,
      cartoons,
      ...(await serverSideTranslations(locale, [
        "common",
        "header",
      ])),
    },
  };
};

export default Home;