import React, { FC, ReactNode } from "react";
import s from "./TextButton.module.scss";

interface Props {
  fs?: string;
  children: ReactNode;
  className?: string;
}

const TextButton: FC<Props> = ({ fs, children, className }) => {
  return (
    <div className={`${s.buttonContainer} ${className}`}>
      <button
        className={s.button}
        style={{
          fontSize: fs && fs,
        }}
      >
        {children}
      </button>
    </div>
  )
};

export default TextButton;
