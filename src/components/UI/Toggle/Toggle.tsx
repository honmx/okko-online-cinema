import React, { FC } from "react";
import s from "./Toggle.module.scss";

interface Props {
  values: [string, string];
  activeValue: string;
  textPosition?: "left" | "right";
  className?: string;
  onClick: () => void;
}

const Toggle: FC<Props> = ({ values, activeValue, textPosition = "left", className, onClick }) => {

  const [primaryValue, secondaryValue] = values;

  return (
    <div className={`${s.toggleOuterContainer} ${className}`}>
      <div className={s.toggleInnerContainer}>
        {
          textPosition === "left" &&
          <div className={s.text} style={{marginRight: "5px"}}>{activeValue}</div>
        }
        <button className={`${s.toggle} ${activeValue !== primaryValue ? s.accentBg : ""}`} onClick={onClick}>
          <div className={`${s.circle} ${activeValue === primaryValue ? s.left : s.right}`} />
        </button>
        {
          textPosition === "right" &&
          <div className={s.text} style={{marginLeft: "5px"}}>{activeValue}</div>
        }
      </div>
    </div>
  )
};

export default Toggle;