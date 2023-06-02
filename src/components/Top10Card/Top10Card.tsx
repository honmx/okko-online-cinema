import React, { FC } from "react";
import s from "./Top10Card.module.scss";
import { IMovie } from "@/types/IMovie";
import Image, { StaticImageData } from "next/image";
import Card from "../UI/Card/Card";
import number1 from "@/assets/top10numbers/1.svg";
import number2 from "@/assets/top10numbers/2.svg";
import number3 from "@/assets/top10numbers/3.svg";
import number4 from "@/assets/top10numbers/4.svg";
import number5 from "@/assets/top10numbers/5.svg";
import number6 from "@/assets/top10numbers/6.svg";
import number7 from "@/assets/top10numbers/7.svg";
import number8 from "@/assets/top10numbers/8.svg";
import number9 from "@/assets/top10numbers/9.svg";
import number10 from "@/assets/top10numbers/10.svg";

const numbers = [
  number1, number2, number3, number4, number5,
  number6, number7, number8, number9, number10,
];

interface Props {
  movie: IMovie;
  number: number;
  className?: string;
}

const Top10Card: FC<Props> = ({ movie, number, className }) => {
  return (
    <div className={`${s.container} ${className}`}>
      <div className={s.imgWrapper}>
        <Image src={numbers[number]} alt="number" />
      </div>
      <Card item={movie} linkHref={`/movie/${movie.title}`} ar={0.66} />
    </div>
  )
};

export default Top10Card;
