import React, { FC, MouseEvent } from "react";
import { SelectOptionType } from "../Select/DesktopSelect/DesktopSelect";
import s from "./Option.module.scss";
import { IText } from "@/types/IText";

interface Props {
  value: IText;
  selectedValue: IText;
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
      className={`${s.option} ${selectedValue.en === value.en ? s.selected : ""} ${className}`}
      onClick={handleClick}
    >
      {value.ru}
    </button>
  )
};

export default Option;
