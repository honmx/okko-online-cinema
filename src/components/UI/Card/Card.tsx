import React, { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMovie } from "@/types/IMovie";
import { CardType } from "@/types/CardType";
import s from "./Card.module.scss";

interface Props {
  item: CardType | IMovie;
  linkHref: string;
  ar?: 1 | 1.77 | 0.66;
}


const Card: FC<Props> = ({ item, linkHref, ar = 1.77 }) => {
  return (
    <Link href={linkHref}>
      <div className={s.card} style={{ aspectRatio: ar }}>
        <Image
          src={ar === 0.66 ? item.verticalPhoto : item.horizontalPhoto}
          alt={item.title.toString()}
          priority
          width={1920}
          height={1080}
          className={s.img}
        />
      </div>
    </Link>
  )
};

export default Card;
