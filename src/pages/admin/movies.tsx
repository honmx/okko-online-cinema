import React, { FC } from "react";
import s from "./AdminMovies.module.scss";
import { GetStaticProps, NextPage } from "next";
import entitiesService from "@/services/entitiesService";
import { IMovie } from "@/types/IMovie";
import Image from "next/image";
import AdminMovieCard from "@/components/AdminMovieCard/AdminMovieCard";

interface Props {
  movies: IMovie[];
}

const AdminMovies: NextPage<Props> = ({ movies }) => {

  console.log(movies);

  return (
    <div className={s.adminMoviesPageContainer}>
      <div className={s.moviesContainer}>
        {
          movies.map(movie => <AdminMovieCard movie={movie} />)
        }
      </div>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async () => {

  const movies = await entitiesService.getAdminMovies();

  return {
    props: {
      movies: movies.filter(movie => movie.horizontalPhoto)
    }
  }
}

export default AdminMovies;
