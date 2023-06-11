import React, { FC, MouseEvent, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import Image from "next/image";
import Title from "../../Title/Title";
import Slider from "../../Slider/Slider";
import IconButton from "../../IconButton/IconButton";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import { CommonProps } from "../index";
import close from "../../../../assets/close.svg";
import s from "./MobileRange.module.scss";

interface Props extends CommonProps {

}

const MobileRange: FC<Props> = ({ value, setValue, min, max, step, title, className }) => {

  const { t } = useTranslation("moviesPage");

  const ref = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<boolean>(false);

  useOutsideClick(ref, () => setActive(false));

  const handleSelectClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(prev => !prev);
  }

  return (
    <div ref={ref} className={`${s.rangeContainer} ${className}`}>
      <div className={s.rangeSelect} onClick={handleSelectClick}>
        <Title fs="16px">{title}</Title>
        <p className={s.value}>{t("moviesPage:from")} {value}</p>
      </div>
      {
        active &&
        <div className={s.range}>
          <Title className={s.text}>{t("moviesPage:from")} {value}</Title>
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
