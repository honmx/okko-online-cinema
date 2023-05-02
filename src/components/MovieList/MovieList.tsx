import React, { FC } from "react";
import s from "./MovieList.module.scss";
import { IMovie } from "@/types/IMovie";
import Card from "../UI/Card/Card";

interface Props {
  movies: IMovie[];
  className?: string;
}

const MovieList: FC<Props> = ({ movies, className }) => {
  return (
    <div className={`${s.movieListContainer} ${className}`}>
      {
        movies.filter(movie => movie.horizontalPhoto).map(movie => <Card item={movie} linkHref={`/movie/${movie.title}`} />)
      }
    </div>
  )
};

export default MovieList;
