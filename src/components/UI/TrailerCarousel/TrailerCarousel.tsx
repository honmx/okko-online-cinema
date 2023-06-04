import React, { FC, ReactNode, useState } from "react";
import s from "./TrailerCarousel.module.scss";
import { useCarouselScroll } from "@/hooks/useCarouselScroll";
import Image from "next/image";
import arrow from "../../../assets/arrow.svg";
import { IMovie } from "@/types/IMovie";
import TrailerCard from "@/components/TrailerCard/TrailerCard";

interface Props {
  movies: IMovie[];
  className?: string;
}

const TrailerCarousel: FC<Props> = ({ movies, className }) => {

  const { ref, isAbleToScrollLeft, isAbleToScrollRight } = useCarouselScroll();

  const [activeMovie, setActiveMovie] = useState<number>(0);

  const handleLeftButtonClick = () => {
    if (!ref.current) return;

    ref.current.scrollTo({
      left: ref.current.scrollLeft - ref.current.clientWidth,
      top: 0,
      behavior: "smooth",
    });

    setActiveMovie(prev => prev - 1);
  }
  
  const handleRightButtonClick = () => {
    if (!ref.current) return;
    
    ref.current.scrollTo({
      left: ref.current.scrollLeft + ref.current.children[0].clientWidth,
      top: 0,
      behavior: "smooth",
    });

    setActiveMovie(prev => prev + 1);
  }

  return (
    <div className={`${s.container} ${className}`}>
      <div className={s.listContainer}>
        {
          isAbleToScrollLeft &&
          <div className={s.carouselButtonWrapper}>
            <button className={`${s.carouselButton} ${s.leftButton}`} onClick={handleLeftButtonClick}>
              <Image src={arrow} alt="arrow" />
            </button>
          </div>
        }
        <div className={s.childrenContainer} ref={ref}>
          {
            movies.map((movie, i) => <TrailerCard key={movie.id} movie={movie} active={i === activeMovie} />)
          }
        </div>
        {
          isAbleToScrollRight &&
          <div className={s.carouselButtonWrapper}>
            <button className={`${s.carouselButton} ${s.rightButton}`} onClick={handleRightButtonClick}>
              <Image src={arrow} alt="arrow" />
            </button>
          </div>
        }
      </div>
    </div>
  )
};

export default TrailerCarousel;
