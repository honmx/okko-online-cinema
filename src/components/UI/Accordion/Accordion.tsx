import React, { FC, ReactNode, useState } from "react";
import arrow from "@/assets/arrow.svg";
import s from "./Accordion.module.scss";
import Text from "../Text/Text";
import Image from "next/image";

interface Props {
  title: string;
  className?: string;
  children: ReactNode;
}

const Accordion: FC<Props> = ({ title, className, children }) => {

  const [active, setActive] = useState<boolean>(false);

  return (
    <div className={`${s.accordion} ${className}`} onClick={() => setActive(prev => !prev)}>
      <div className={s.titleContainer}>
        <Text>{title}</Text>
        <Image src={arrow} alt="arrow" style={{
          rotate: active ? "0deg" : "180deg",
        }} />
      </div>
      {
        active &&
        <div className={s.accordionItems}>
          {children}
        </div>
      }
    </div>
  )
};

export default Accordion;
