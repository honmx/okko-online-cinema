import React, { FC } from "react";
import s from "./Button.module.scss";
import Image from "next/image";

interface Props {
  value?: string;
  bgColor?: "accent" | "primary";
  p?: string;
  shape?: "circle" | "rectangle";
  img?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
}

const Button: FC<Props> = ({ value, bgColor, p, shape, img, disabled, className, onClick }) => {
  return (
    <div className={`${s.buttonWrapper} ${className} ${shape === "circle" && s.circle} ${disabled && s.disabled}`}>
      <div className={`${s.buttonOuterContainer}`}>
        <div className={s.buttonInnerContainer}>
          <button
            className={`${bgColor === "accent" ? s.accentBgColor : s.primaryBgColor} ${s.button}`}
            style={{padding: p && p}}
            onClick={onClick && onClick}
            disabled={disabled && disabled}
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
