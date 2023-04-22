import React, { ChangeEvent, Dispatch, FC, SetStateAction, useRef, useState } from "react";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import Image from "next/image";
import arrow from "../../../../assets/arrow.svg";
import s from "./DesktopRange.module.scss";
import CommonProps from "../IProps";
import Slider from "../../Slider/Slider";

interface Props extends CommonProps {

}

const Range: FC<Props> = ({ value, setValue, min, max, step, className }) => {

  const ref = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<boolean>(false);

  useOutsideClick(ref, () => setActive(false));

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  }

  const handleClick = () => {
    setActive(prev => !prev);
  }

  return (
    <div ref={ref} className={`${s.container} ${className}`}>
      <div className={s.valueContainer} onClick={handleClick}>
        <p className={s.value}>{value === 0 ? "Рейтинг" : `От ${value}`}</p>
        <Image src={arrow} alt="arrow" className={`${s.arrow} ${active ? s.activeArrow : ""}`} />
      </div>
      {
        active &&
        <div className={s.selectContainer}>
          <p className={s.value}>От {value}</p>
          <Slider
            value={value}
            setValue={setValue}
            min={min}
            max={max}
            step={step}
            className={s.slider}
          />
        </div>
      }
    </div>
  )
};

export default Range;
