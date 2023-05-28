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
    <div className={s.cardWrapper} ref={ref}>
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
                <div className={s.movieTitle}>5.0 sdfsd  sdfg sdfg</div>
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
          <Button shape="circle" p="5px" img={!activeSound ? sound : soundDisabled} onClick={handleSoundClick} className={s.sound} />
        </>
      }
    </div>
  )
};

export default Card;