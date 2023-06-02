import React, { FC, ReactNode } from "react";
import s from "./Modal.module.scss";
import IconButton from "../IconButton/IconButton";
import Image from "next/image";
import close from "../../../assets/close.svg";
import { useScrollStart } from "@/hooks/useScrollStart";

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
