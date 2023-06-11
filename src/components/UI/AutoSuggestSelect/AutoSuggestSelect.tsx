import React, { FC } from "react";
import { useTranslation } from "next-i18next";
import { useSmallerDevice } from "../../../hooks/useSmallerDevice";
import s from "./AutoSuggestSelect.module.scss";

interface Props {
  value: string;
  placeholder: string;
  onClick: () => void;
  className?: string;
}

const AutoSuggestSelect: FC<Props> = ({ value, placeholder, onClick, className }) => {

  const { i18n } = useTranslation("moviesPage");
  const lang = i18n.language;

  const isSmaller = useSmallerDevice(959);

  return (
    <div className={`${s.container} ${className}`} onClick={onClick}>
      {
        isSmaller ? <>
          <p className={s.mobilePlaceholder}>{placeholder}</p>
          <p className={s.mobileValue}>{!value && lang === "en" ? "All" : value}</p>
        </> : <>
          <p className={s.desktopValue}>{value ? value : placeholder}</p>
        </>
      }
    </div>
  )
};

export default AutoSuggestSelect;
