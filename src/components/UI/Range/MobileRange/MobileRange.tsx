import React, { FC, MouseEvent, useRef, useState } from "react";
import { CommonProps } from "../index";
import Title from "../../Title/Title";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import Slider from "../../Slider/Slider";
import Image from "next/image";
import close from "../../../../assets/close.svg";
import IconButton from "../../IconButton/IconButton";
import s from "./MobileRange.module.scss";

interface Props extends CommonProps {

}

const MobileRange: FC<Props> = ({ value, setValue, min, max, step, title, className }) => {

  const [active, setActive] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setActive(false));

  const handleSelectClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(prev => !prev);
  }

  return (
    <div ref={ref} className={`${s.rangeContainer} ${className}`}>
      <div className={s.rangeSelect} onClick={handleSelectClick}>
        <Title fs="16px">{title}</Title>
        <p className={s.value}>От {value}</p>
      </div>
      {
        active &&
        <div className={s.range}>
          <Title className={s.text}>От {value}</Title>
          <Slider
            value={value}
            setValue={setValue}
            min={min}
            max={max}
            step={step}
          />
          <IconButton className={s.button} onClick={() => setActive(false)}>
            <Image src={close} alt="close" />
          </IconButton>
        </div>
      }
    </div>
  )
};

export default MobileRange;
