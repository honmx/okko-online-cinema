import React, { FC } from "react";
import s from "./Button.module.scss";
import Image from "next/image";

interface Props {
  value?: string;
  bgColor?: "accent" | "primary";
  // ar?: number;
  p?: string;
  shape?: "circle" | "rectangle";
  img?: string;
  className?: string;
}

const Button: FC<Props> = ({ value, bgColor, p, shape, img, className }) => {
  return (
    <div className={`${s.buttonWrapper} ${className} ${shape === "circle" && s.circle}`}>
      <div className={`${s.buttonOuterContainer}`}>
        <div className={s.buttonInnerContainer}>
          <button
            className={`${bgColor === "accent" ? s.accentBgColor : s.primaryBgColor} ${s.button}`}
            style={{padding: p && p}}
          >
            {
              img &&
              <Image src={img} alt={img} />
            }
            {
              value &&
              <span className={s.span}>{value}</span>
            }
          </button>
        </div>
      </div>
    </div>
  )
};

export default Button;
