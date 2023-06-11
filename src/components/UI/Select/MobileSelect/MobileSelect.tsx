import React, { FC, MouseEvent, useRef, useState } from "react";
import { useTranslation } from "next-i18next";
import Title from "../../Title/Title";
import OptionsList from "../../OptionsList/OptionsList";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import { CommonProps } from "../index";
import s from "./MobileSelect.module.scss";

interface Props extends Omit<CommonProps, "img"> {
  title: string;
}

const MobileSelect: FC<Props> = ({ values, selectedValue, setSelectedValue, title, className }) => {

  const { i18n } = useTranslation("moviesPage");

  const lang = i18n.language;

  const ref = useRef<HTMLDivElement>(null);
  
  const [active, setActive] = useState<boolean>(false);

  useOutsideClick(ref, () => setActive(false));

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setActive(prev => !prev);
  }

  const handleSelectClick = (e: MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    setActive(prev => !prev);
  }

  return (
    <div ref={ref} className={`${s.selectContainer} ${className}`} onClick={handleSelectClick}>
      <Title fs="16px">{title}</Title>
      <p className={s.selectedValue}>{selectedValue === "Все" && lang === "en" ? "All" : selectedValue}</p>
      {
        active &&
        <div className={s.optionsListContainer}>
          <OptionsList
            values={values}
            selectedValue={selectedValue}
            onOptionClick={handleOptionClick}
            className={s.optionsList}
          />
        </div>
      }
    </div>
  )
};

export default MobileSelect;
