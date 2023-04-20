import React, { FC, ReactNode, createElement } from "react";
import s from "./Title.module.scss";

interface Props {
  variant?: "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p" | "span";
  fs?: string;
  fw?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900;
  color?: string;
  className?: string;
  children: ReactNode;
}

const Title: FC<Props> = ({ variant = "p", fs, fw, color, className, children }) => {

  const textNode = createElement(
    variant,
    {
      className: `${s.text} ${className}`,
      style: {
        fontSize: fs && fs,
        fontWeight: fw && fw,
        color: color && color
      },
    },
    children
  );

  return textNode;
};

export default Title;