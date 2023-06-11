import React, { FC, ReactNode } from "react";
import Link from "next/link";
import Image, { StaticImageData } from "next/image";
import Title from "../Title/Title";
import { useCarouselScroll } from "../../../hooks/useCarouselScroll";
import arrow from "../../../assets/arrow.svg";
import s from "./Carousel.module.scss";

interface Props {
  title?: string;
  linkHref?: string;
  image?: StaticImageData;
  className?: string;
  onTitleClick?: () => void;
  children: ReactNode;
}

const Carousel: FC<Props> = ({ title, linkHref, image, className, children, onTitleClick }) => {

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
      <div className={s.titleContainer}>
        {
          title && !linkHref && image &&
          <>
            <Image src={image} alt="image" className={s.image} />
            <Title variant="h2" className={s.title}>{title}</Title>
          </>
        }
        {
          title && linkHref && !image &&
          <Link href={linkHref} className={s.link} onClick={onTitleClick}>
            <Title variant="h2" className={s.title}>{title}</Title>
            <Image src={arrow} alt="arrow" className={s.arrow} />
          </Link>
        }
        {
          title && !linkHref && !image &&
          <Title variant="h2" className={s.title}>{title}</Title>
        }
      </div>
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
