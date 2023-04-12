import React, { FC } from "react";
import s from "./Button.module.scss";
import Image from "next/image";

interface Props {
  value?: string;
  bgColor?: "accent" | "primary";
  img?: string;
  className?: string;
}

const Button: FC<Props> = ({ value, bgColor, img, className }) => {
  return (
    <div className={`${s.buttonWrapper} ${className}`}>
      <div className={s.buttonOuterContainer}>
        <div className={s.buttonInnerContainer}>
          <button
            className={
              `${bgColor === "accent" ? s.accentBgColor : s.primaryBgColor} ${s.button}`
            }
          >
            {
              img &&
              <Image src={img} alt={img} />
            }
            {value}
          </button>
        </div>
      </div>
    </div>
  )
};

export default Button;
