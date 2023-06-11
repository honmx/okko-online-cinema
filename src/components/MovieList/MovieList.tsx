import React, { FC } from "react";
import Card from "../UI/Card/Card";
import { IMovie } from "@/types/IMovie";
import s from "./MovieList.module.scss";

interface Props {
  movies: IMovie[];
  className?: string;
}

const MovieList: FC<Props> = ({ movies, className }) => {
  return (
    <div className={`${s.movieListContainer} ${className}`}>
      {
        movies
          .filter(movie => movie.horizontalPhoto)
          .map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} />)
      }
    </div>
  )
};

export default MovieList;
