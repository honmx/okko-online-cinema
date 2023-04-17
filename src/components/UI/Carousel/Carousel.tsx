import React, { FC, ReactNode } from "react";
import Text from "../Text/Text";
import Link from "next/link";
import Image from "next/image";
import arrow from "../../../assets/arrow.svg";
import s from "./Carousel.module.scss";
import { useCarouselScroll } from "../../../hooks/useCarouselScroll";

interface Props {
  title?: string;
  linkHref?: string;
  image?: string;
  className?: string;
  children: ReactNode;
}

const Carousel: FC<Props> = ({ title, linkHref, image, className, children }) => {

  const { ref, isAbleToScrollLeft, isAbleToScrollRight } = useCarouselScroll();

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
      {
        title && !linkHref && image &&
        <div className={s.titleContainer}>
          <Image src={image} alt="image" className={s.image} />
          <Text variant="h2" className={s.title}>{title}</Text>
        </div>
      }
      {
        title && linkHref && !image &&
        <Link href={linkHref} className={s.link}>
          <Text variant="h2" className={s.title}>{title}</Text>
          <Image src={arrow} alt="arrow" className={s.arrow} />
        </Link>
      }
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
