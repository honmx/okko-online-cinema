import React, { FC, ReactElement, useEffect } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import Head from "next/head";
import { useRouter } from "next/router";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters } from "@/store/slices/moviesFilterSlice";
import { GetStaticPaths, GetStaticProps } from "next";
import { IMovie } from "@/types/IMovie";
import axios from "axios";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { ParsedUrlQuery } from "querystring";
import s from "./MoviesFilterPage.module.scss";
import MovieList from "@/components/MovieList/MovieList";
import dynamic from "next/dynamic";

interface Props {
  movies: IMovie[];
}

const ClientMovieList = dynamic(() => import("../../components/MovieList/MovieList"));

const MoviesFilterPage: NextPageWithLayout<Props> = ({ movies }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    selectedGenre,
    selectedCountry,
    minRating,
    minCountOfRating,
    selectedProducer,
    selectedActor,
    sortBy
  } = useSelectedFilters();

  useEffect(() => {
    if (selectedGenre.en === "All" && selectedCountry.en === "All"
      && minRating === 0 && minCountOfRating === 0 && selectedProducer === ""
      && selectedActor === "" && sortBy.en === "All"
    ) router.push("/movies");
  }, [
    JSON.stringify({
      selectedGenre, selectedCountry,
      minRating, minCountOfRating,
      selectedProducer, selectedActor, sortBy
    })
  ])

  return (
    <>
      <Head>
        <title>Фильмы</title>
        <meta
          name="description"
          content="Смотреть фильмы онлайн в хорошем качестве"
        />
      </Head>
      <div>
        <ClientMovieList movies={movies} />
      </div>
    </>
  )
};

MoviesFilterPage.getLayout = (page: ReactElement) => {
  return (
    <MoviesPageLayout>{page}</MoviesPageLayout>
  )
}

interface Params extends ParsedUrlQuery {
  pageWithFilter: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {

  const { data: movies } = await axios.get<IMovie[]>("/movie");

  return {
    paths: movies.map(movie => ({
      params: {
        pageWithFilter: movie.title
      }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async () => {

  const { data: movies } = await axios.get<IMovie[]>("/movie");

  return {
    props: {
      movies,
    }
  }
}

export default MoviesFilterPage;