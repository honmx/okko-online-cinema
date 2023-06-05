import React, { FC, useEffect, useRef, useState } from "react";
import s from "./TrailerCard.module.scss";
import { IMovie } from "@/types/IMovie";
import Image from "next/image";

interface Props {
  movie: IMovie;
  active: boolean;
}

const TrailerCard: FC<Props> = ({ movie, active }) => {

  const ref = useRef<HTMLDivElement>(null);

  const [isActive, setIsActive] = useState<boolean>(false);
  const [activeSound, setActiveSound] = useState<boolean>(true);

  const handleSoundClick = () => {
    setActiveSound(prev => !prev);
  }

  return (
    <div className={s.container} ref={ref}>
      <div className={s.card}>
        <div className={s.imgWrapper}>
          {
            active
              ? <video src="/trailer.mp4" autoPlay width="100%" height="100%" muted={activeSound} loop />
              : <Image src={movie.horizontalPhoto} alt="movie photo" width={1920} height={1080} />
          }
        </div>
      </div>
    </div>
  )
};

export default TrailerCard;