import React, { FC, MouseEvent } from "react";
import { SelectOptionType } from "../Select/DesktopSelect/DesktopSelect";
import s from "./Option.module.scss";

interface Props {
  value: SelectOptionType;
  selectedValue: SelectOptionType;
  className?: string;
  onClick?: () => void;
}

const Option: FC<Props> = ({ value, selectedValue, className, onClick }) => {

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();

    if (onClick) onClick();
  }

  return (
    <button
      className={`${s.option} ${selectedValue.value === value.value ? s.selected : ""} ${className}`}
      onClick={handleClick}
    >
      {value.text}
    </button>
  )
};

export default Option;
