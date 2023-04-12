import React, { FC, ReactNode } from "react";
import s from "./Title.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

const Title: FC<Props> = ({ className, children }) => {
  return (
    <p className={`${s.title} ${className}`}>{children}</p>
  )
};

export default Title;
