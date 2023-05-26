import React, { FC } from "react";
import s from "./AutoSuggestSelectDesktop.module.scss";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";

interface Props {
  value: string;
  placeholder: string;
  onClick: () => void;
  className?: string;
}

const AutoSuggestSelectDesktop: FC<Props> = ({ value, placeholder, onClick, className }) => {

  const isSmaller = useSmallerDevice(959);

  return (
    <div className={`${s.container} ${className}`} onClick={onClick}>
      {
        isSmaller ? <>
          <p className={s.mobilePlaceholder}>{placeholder}</p>
          <p className={s.mobileValue}>{value ? value : "Все"}</p>
        </> : <>
          <p className={s.desktopValue}>{value ? value : placeholder}</p>
        </>
      }
    </div>
  )
};

export default AutoSuggestSelectDesktop;
