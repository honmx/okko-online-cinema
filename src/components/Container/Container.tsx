import React, { FC, ReactNode } from "react";
import s from "./Container.module.scss";

interface Props {
  maxWidth: string;
  children: ReactNode;
}

const Container: FC<Props> = ({ maxWidth, children }) => {
  return (
    <div className={s.container} style={{maxWidth: maxWidth}}>
      {children}
    </div>
  )
};

export default Container;
