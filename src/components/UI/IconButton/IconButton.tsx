import React, { FC, ReactNode } from "react";
import s from "./IconButton.module.scss";

interface Props {
  className?: string;
  children: ReactNode;
}

const IconButton: FC<Props> = ({ className, children }) => {
  return (
    <div className={`${s.buttonWrapper} ${className}`}>
      <button>
        {children}
      </button>
    </div>
  )
};

export default IconButton;
