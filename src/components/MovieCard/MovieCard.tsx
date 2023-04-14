import React, { FC } from "react";
import { IMovie } from "@/types/IMovie";
import Link from "next/link";
import Image from "next/image";
import s from "./MovieCard.module.scss";

interface Props {
  movie: IMovie;
  ar?: 1 | 1.77 | 0.66;
}


const MovieCard: FC<Props> = ({ movie, ar = 1.77 }) => {
  return (
    <Link href={movie.title}>
      <div className={s.card} style={{aspectRatio: ar}}>
        <Image src={movie.image} alt={movie.title} width={1920} height={1080} className={s.img} />
      </div>
    </Link>
  )
};

export default MovieCard;
