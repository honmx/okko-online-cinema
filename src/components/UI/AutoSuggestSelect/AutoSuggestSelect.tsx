import React, { FC } from "react";
import s from "./AutoSuggestSelect.module.scss";
import { useSmallerDevice } from "../../../hooks/useSmallerDevice";
import { useTranslation } from "next-i18next";

interface Props {
  value: string;
  placeholder: string;
  onClick: () => void;
  className?: string;
}

const AutoSuggestSelect: FC<Props> = ({ value, placeholder, onClick, className }) => {

  const { t, i18n } = useTranslation("moviesPage");
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
