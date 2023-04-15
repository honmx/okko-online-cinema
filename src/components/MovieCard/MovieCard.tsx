import React, { FC } from "react";
import { IMovie } from "@/types/IMovie";
import Link from "next/link";
import Image from "next/image";
import s from "./MovieCard.module.scss";

interface Props {
  card: CardType;
  ar?: 1 | 1.77 | 0.66;
}


const MovieCard: FC<Props> = ({ card, ar = 1.77 }) => {
  return (
    <Link href={card.title}>
      <div className={s.card} style={{aspectRatio: ar}}>
        <Image src={card.image} alt={card.title} priority width={1920} height={1080} className={s.img} />
      </div>
    </Link>
  )
};

export default MovieCard;
