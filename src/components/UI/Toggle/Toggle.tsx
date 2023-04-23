import React, { FC } from "react";
import s from "./Toggle.module.scss";

interface Props {
  values: [string, string];
  activeValue: string;
  className?: string;
  onClick: () => void;
}

const Toggle: FC<Props> = ({ values, activeValue, className, onClick }) => {

  const [primaryValue, secondaryValue] = values;

  return (
    <div className={`${s.toggleOuterContainer} ${className}`}>
      <div className={s.toggleInnerContainer}>
        <div className={s.text}>{activeValue}</div>
        <button className={`${s.toggle} ${ activeValue !== primaryValue ? s.accentBg : ""}`} onClick={onClick}>
          <div className={`${s.circle} ${ activeValue === primaryValue ? s.left : s.right}`} />
        </button>
      </div>
    </div>
  )
};

export default Toggle;