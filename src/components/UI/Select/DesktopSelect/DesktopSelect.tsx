import React, { FC, MouseEvent, useState, useRef } from "react";
import Image from "next/image";
import arrow from "../../../../assets/arrow.svg";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import s from "./DesktopSelect.module.scss";
import { CommonProps } from "../index";
import OptionsList from "../../OptionsList/OptionsList";
import { IText } from "../../../../types/IText";
import { isGenreType } from "../../../../helpers/isGenreType";
import Title from "../../Title/Title";
import { IGenre } from "../../../../types/IGenre";
import { useSmallerDevice } from "../../../../hooks/useSmallerDevice";
import { useTranslation } from "next-i18next";

export type SelectOptionType = {
  value: string;
  text: string;
}

interface Props extends Omit<CommonProps, "title"> {

}

const DesktopSelect: FC<Props> = ({ img, values, selectedValue, setSelectedValue, className }) => {

  const { t, i18n } = useTranslation("moviesPage");

  const lang = i18n.language;

  const ref = useRef<HTMLDivElement>(null);

  const [active, setActive] = useState<boolean>(false);

  useOutsideClick(ref, () => setActive(false));

  const handleOptionClick = (value: string) => {
    setSelectedValue(value);
    setActive(prev => !prev);
  }

  const handleSelectClick = (e: MouseEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setActive(prev => !prev);
  }

  return (
    <div className={`${s.selectContainer} ${className}`} ref={ref}>
      {
        img &&
        <Image src={img} alt="img" className={s.selectImage} />
      }
      <select
        className={`${s.select} ${img ? s.selectWithImage : ""}`}
        onMouseDown={handleSelectClick}
        onChange={() => { }}
        value="Все"
      >
        <option
          value="All"
          className={selectedValue === "All" ? s.selected : ""}
        >
          {selectedValue === "Все" && lang === "en" ? "All" : selectedValue}
        </option>
        {
          values.map(value => (
            <option
              key={isGenreType(value) ? value.title : value}
              value={isGenreType(value) ? value.title : value}
              className={selectedValue === value ? s.selected : ""}
            >
              {isGenreType(value) ? value.title : value}
            </option>
          ))
        }
      </select>
      <div className={`${s.arrow} ${active ? s.activeArrow : ""}`}>
        <Image src={arrow} alt="arrow" />
      </div>
      {
        active &&
        <OptionsList
          values={values}
          selectedValue={selectedValue}
          onOptionClick={handleOptionClick}
          className={s.optionsList}
        />
      }
    </div>
  )
};

export default DesktopSelect;
