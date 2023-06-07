import React, { FC, useEffect, useRef, useState } from "react";
import s from "./TrailerCard.module.scss";
import { IMovie } from "../../types/IMovie";
import Image from "next/image";
import Button from "../UI/Button/Button";
import sound from "../../assets/sound.svg";
import soundDisabled from "../../assets/soundDisabled.svg";
import Link from "next/link";
import { useDelay } from "@/hooks/useDelay";

interface Props {
  movie: IMovie;
  active: boolean;
}

const TrailerCard: FC<Props> = ({ movie, active }) => {

  const ref = useRef<HTMLDivElement>(null);

  const isAfterDelay = useDelay(1000, active);

  const [activeSound, setActiveSound] = useState<boolean>(true);

  const handleSoundClick = () => {
    setActiveSound(prev => !prev);
  }

  return (
    <div className={s.container} ref={ref}>
      <div className={s.card}>
        <Link href={`/movie/${movie.title}`}>
          <div className={s.imgWrapper}>
            {
              active && isAfterDelay
                ? <video src="/trailer.mp4" autoPlay width="100%" height="100%" muted={activeSound} loop />
                : <Image src={movie.horizontalPhoto} alt="movie photo" width={1920} height={1080} />
            }
          </div>
        </Link>
        {
          active && isAfterDelay &&
          <div className={s.trailerButtonsContainer}>
            <Button shape="circle" p="10px" img={!activeSound ? sound : soundDisabled} onClick={handleSoundClick} />
          </div>
        }
      </div>
    </div>
  )
};

export default TrailerCard;
