import React, { FC } from "react";
import s from "./AutoSuggestSelectDesktop.module.scss";

interface Props {
  value: string;
  placeholder: string;
  onClick: () => void;
  className?: string;
}

const AutoSuggestSelectDesktop: FC<Props> = ({ value, placeholder, onClick, className }) => {
  return (
    <div className={`${s.container} ${className}`} onClick={onClick}>
      <p>{value ? value : placeholder}</p>
    </div>
  )
};

export default AutoSuggestSelectDesktop;
