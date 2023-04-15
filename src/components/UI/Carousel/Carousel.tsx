import React, { FC, ReactNode, useEffect, useRef, useState } from "react";
import Title from "../Title/Title";
import Link from "next/link";
import Image from "next/image";
import arrow from "../../../assets/arrow.svg";
import s from "./Carousel.module.scss";

interface Props {
  title: string;
  linkHref: string;
  className?: string;
  children: ReactNode;
}

const Carousel: FC<Props> = ({ title, linkHref, className, children }) => {

  const ref = useRef<HTMLDivElement | null>(null);
  
  const [isAbleToScrollLeft, setIsAbleToScrollLeft] = useState<boolean>(false);
  const [isAbleToScrollRight, setIsAbleToScrollRight] = useState<boolean>(true);
  
  useEffect(() => {
    
    const onScroll = () => {

      if (!ref.current) return;

      ref.current.scrollLeft > 5
        ? setIsAbleToScrollLeft(true)
        : setIsAbleToScrollLeft(false);

      ref.current.scrollWidth <= ref.current.clientWidth + ref.current.scrollLeft + 5
        ? setIsAbleToScrollRight(false)
        : setIsAbleToScrollRight(true);
    }

    ref.current?.addEventListener("scroll", onScroll);

    return () => ref.current?.removeEventListener("scroll", onScroll);
  }, []);

  const handleLeftButtonClick = () => {
    if (!ref.current) return;

    ref.current.scrollTo({
      left: ref.current.scrollLeft - ref.current.clientWidth,
      top: 0,
      behavior: "smooth",
    });
  }

  const handleRightButtonClick = () => {
    if (!ref.current) return;

    ref.current.scrollTo({
      left: ref.current.scrollLeft + ref.current.clientWidth,
      top: 0,
      behavior: "smooth",
    });
  }

  return (
    <div className={`${s.carouselContainer} ${className}`}>
      <Link href={linkHref} className={s.link}>
        <Title className={s.title}>{title}</Title>
        <Image src={arrow} alt="arrow" className={s.arrow} />
      </Link>
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
          {children}
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

export default Carousel;
