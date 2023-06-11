import React, { FC, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTranslation } from 'react-i18next';
import Button from "../Button/Button";
import Title from "../Title/Title";
import { IMovie } from "../../../types/IMovie";
import { useHover } from "../../../hooks/useHover";
import { useDelay } from "../../../hooks/useDelay";
import { isMovieType } from "../../../helpers/isMovieType";
import { capitalize } from "../../../helpers/capitalize";
import { IGenre } from "../../../types/IGenre";
import soundDisabled from "../../../assets/soundDisabled.svg";
import sound from "../../../assets/sound.svg";
import s from "./Card.module.scss";

interface Props {
  item: IGenre | IMovie;
  linkHref: string;
  ar?: 1 | 1.77 | 0.66;
  onClick?: (item: IGenre) => void;
}


const Card: FC<Props> = ({ item, linkHref, ar = 1.77, onClick }) => {

  const { i18n } = useTranslation();
  const lang = i18n.language;

  const ref = useRef<HTMLDivElement>(null);

  const isHover = useHover(ref);
  const isActive = useDelay(500, isHover);

  const [activeSound, setActiveSound] = useState<boolean>(true);

  const handleSoundClick = () => {
    setActiveSound(prev => !prev);
  }

  const handleGenreClick = () => {
    if (!onClick) return;

    onClick(item as IGenre);
  }

  return (
    <div className={`${s.cardWrapper} ${isHover && isActive && isMovieType(item) ? s.cardWithTrailer : ""}`} ref={ref} onClick={onClick && handleGenreClick}>
      {
        <Link href={linkHref} className={s.link}>
          <div className={s.card} style={{ aspectRatio: ar }}>
            {
              isHover && isActive && isMovieType(item) &&
              <video src="/trailer.mp4" autoPlay width="100%" height="100%" muted={activeSound} loop className={s.video} />
            }
            {
              (!isHover || !isActive) && isMovieType(item) &&
              <Image
                src={ar === 0.66 ? item.verticalPhoto : item.horizontalPhoto}
                alt={item.title.toString()}
                priority
                width={1920}
                height={1080}
                className={s.img}
              />
            }
            {
              !isMovieType(item) &&
              <p className={s.genreTitle}>{lang === "en" && item.originalTitle ? item.originalTitle : item.title}</p>
            }
          </div>
        </Link>
      }
      {
        isHover && isActive && isMovieType(item) && <>
          <div className={s.movieInfo}>
            <div className={s.upperLine}>
              <div className={s.ratingContainer}>
                <p className={`${s.rating} ${item.rate > 7 ? s.greenRate : s.usualRate}`}>{item.rate}</p>
              </div>
              <Title fs="14px" fw={400}>{lang === "en" && item.originalTitle ? item.originalTitle : item.title}</Title>
            </div>
            <div className={s.lowerLine}>
              <p className={s.genre}>{capitalize(lang === "en" && item.genres[0].originalTitle ? item.genres[0].originalTitle : item.genres[0].title)}</p>
              <p className={s.year}>{item.yearTill}</p>
              <p className={s.country}>{item.country.split(", ")[0]}</p>
            </div>
            <Button shape="circle" p="5px" img={!activeSound ? sound : soundDisabled} onClick={handleSoundClick} className={s.sound} />
          </div>
        </>
      }
    </div>
  )
};

export default Card;