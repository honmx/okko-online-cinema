import React, { FC, useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { IMovie } from "@/types/IMovie";
import { CardType } from "@/types/CardType";
import { useHover } from "@/hooks/useHover";
import { useDelay } from "@/hooks/useDelay";
import Button from "../Button/Button";
import sound from "../../../assets/sound.svg";
import soundDisabled from "../../../assets/soundDisabled.svg";
import s from "./Card.module.scss";
import { isMovieType } from "@/helpers/isMovieType";
import Title from "../Title/Title";
import { capitalize } from "@/helpers/capitalize";

interface Props {
  item: CardType | IMovie;
  linkHref: string;
  ar?: 1 | 1.77 | 0.66;
}


const Card: FC<Props> = ({ item, linkHref, ar = 1.77 }) => {

  const ref = useRef<HTMLDivElement>(null);

  const isHover = useHover(ref);
  const isActive = useDelay(500, isHover);

  const [activeSound, setActiveSound] = useState<boolean>(true);

  const handleSoundClick = () => {
    setActiveSound(prev => !prev);
  }

  return (
    <div className={`${s.cardWrapper} ${isHover && isActive ? s.cardWithTrailer : ""}`} ref={ref}>
      <Link href={linkHref}>
        <div className={s.card} style={{ aspectRatio: ar }}>
          {
            isHover && isActive && isMovieType(item)
              ? <>
                <video
                  src="/trailer.mp4"
                  autoPlay
                  width="100%"
                  height="100%"
                  muted={activeSound}
                  loop
                />
              </> : <Image
                src={ar === 0.66 ? item.verticalPhoto : item.horizontalPhoto}
                alt={item.title.toString()}
                priority
                width={1920}
                height={1080}
                className={s.img}
              />
          }
        </div>
      </Link>
      {
        isHover && isActive && isMovieType(item) && <>
          <div className={s.movieInfo}>
            <div className={s.upperLine}>
              <div className={s.ratingContainer}>
                <p className={`${s.rating} ${item.rate > 7 ? s.greenRate : s.usualRate}`}>{item.rate}</p>
              </div>
              <Title fs="14px" fw={400}>{item.title}</Title>
            </div>
            <div className={s.lowerLine}>
              <p className={s.genre}>{capitalize(item.genres[0].genre)}</p>
              <p className={s.year}>{item.yearTill}</p>
              <p className={s.country}>{item.country.split(", ")[0]}</p>
            </div>
          </div>
          <Button shape="circle" p="5px" img={!activeSound ? sound : soundDisabled} onClick={handleSoundClick} className={s.sound} />
        </>
      }
    </div>
  )
};

export default Card;