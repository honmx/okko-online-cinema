import React, { FC, MouseEvent } from "react";
import s from "./Option.module.scss";

interface Props {
  value: string;
  selectedValue: string;
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
      className={`${s.option} ${selectedValue === value ? s.selected : ""} ${className}`}
      onClick={handleClick}
    >
      {value}
    </button>
  )
};

export default Option;
