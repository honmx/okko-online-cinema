import React, { FC, ReactNode } from "react";
import s from "./IconButton.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
  onClick?: () => void;
}

const IconButton: FC<Props> = ({ className, children, onClick }) => {
  return (
    <div className={`${s.buttonWrapper} ${className}`}>
      <button onClick={onClick && onClick}>
        {children}
      </button>
    </div>
  )
};

export default IconButton;
