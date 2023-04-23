import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";
import s from "./Slider.module.scss";

interface Props {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}

const Slider: FC<Props> = ({ value, setValue, min, max, step, className }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(parseFloat(e.target.value));
  }

  return (
    <div className={`${s.container} ${className}`}>
      <input
        type="range"
        value={value}
        onChange={handleChange}
        min={min}
        max={max}
        step={step}
        className={s.input}
      />
    </div>
  )
};

export default Slider;
