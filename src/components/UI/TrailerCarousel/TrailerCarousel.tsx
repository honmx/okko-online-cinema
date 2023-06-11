import React, { FC, ReactNode, useEffect, useState } from "react";
import Image from "next/image";
import TrailerCard from "../../../components/TrailerCard/TrailerCard";
import { useCarouselScroll } from "../../../hooks/useCarouselScroll";
import { IMovie } from "../../../types/IMovie";
import arrow from "../../../assets/arrow.svg";
import s from "./TrailerCarousel.module.scss";

interface Props {
  movies: IMovie[];
  className?: string;
}

const TrailerCarousel: FC<Props> = ({ movies, className }) => {

  const { ref, isAbleToScrollLeft, isAbleToScrollRight } = useCarouselScroll();

  const [activeMovie, setActiveMovie] = useState<number>(4);

  const handleLeftButtonClick = () => {
    if (!ref.current) return;

    ref.current.scrollTo({
      left: ref.current.scrollLeft - ref.current.children[0].clientWidth,
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

  useEffect(() => {
    if (!ref.current) return;
    
    ref.current.scrollTo({
      left: ref.current.children[0].clientWidth * 4,
      top: 0,
    });
  }, []);

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
