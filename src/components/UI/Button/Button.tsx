import React, { FC, ReactNode } from "react";
import Image from "next/image";
import s from "./Button.module.scss";

interface Props {
  bgColor?: "accent" | "primary";
  p?: string;
  shape?: "circle" | "rectangle";
  img?: string;
  disabled?: boolean;
  className?: string;
  onClick?: () => void;
  children?: ReactNode;
}

const Button: FC<Props> = ({ bgColor, p, shape, img, disabled, className, onClick, children }) => {
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
              children &&
              <div className={s.content}>{children}</div>
            }
          </button>
        </div>
      </div>
    </div>
  )
};

export default Button;
