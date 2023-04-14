import React, { FC, ReactNode } from "react";
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
  return (
    <div className={`${s.carouselContainer} ${className}`}>
      <Link href={linkHref} className={s.link}>
        <Title className={s.title}>{title}</Title>
        <Image src={arrow} alt="arrow" className={s.arrow} />
      </Link>
      <div className={s.childrenContainer}>
        {children}
      </div>
    </div>
  )
};

export default Carousel;
