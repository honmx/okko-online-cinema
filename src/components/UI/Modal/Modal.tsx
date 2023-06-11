import React, { FC, ReactNode } from "react";
import Image from "next/image";
import IconButton from "../IconButton/IconButton";
import { useScrollStart } from "../../../hooks/useScrollStart";
import close from "../../../assets/close.svg";
import s from "./Modal.module.scss";

interface Props {
  onClose: () => void;
  children: ReactNode;
  className?: string;
}

const Modal: FC<Props> = ({ onClose, children, className }) => {

  useScrollStart(true);

  return (
    <div className={`${s.modalWrapper} ${className}`}>
      <div className={s.window}>
        {children}
      </div>
      <IconButton onClick={onClose} className={s.closeBtn}>
        <Image src={close} alt="close" />
      </IconButton>
    </div>
  )
};

export default Modal;
