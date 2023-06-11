import React, { FC, useRef } from "react";
import Image from "next/image";
import { useHover } from "@/hooks/useHover";
import filledStar from "@/assets/filledStar.svg";
import s from "./Star.module.scss";

interface Props {
  index: number;
  activeIndex: number | null;
  setActiveIndex: (value: number) => void;
  activeHoverIndex: number | null;
  setActiveHoverIndex: (value: number | null) => void;
}

const Star: FC<Props> = ({ index, activeIndex, setActiveIndex, activeHoverIndex, setActiveHoverIndex }) => {

  const ref = useRef<HTMLDivElement>(null);

  useHover(ref, index, setActiveIndex, setActiveHoverIndex);

  return (
    <div className={s.starContainer} ref={ref}>
      <Image
        src={filledStar}
        alt="star"
        className={`
          ${s.starImg}
          ${activeHoverIndex !== null && activeHoverIndex >= index
            || activeIndex !== null && activeIndex >= index ? s.active : ""}
        `}
      />
      <p className={s.starNumber}>{index + 1}</p>
    </div>
  )
};

export default Star;
