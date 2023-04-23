import React, { FC, MouseEvent, useState, useRef } from "react";
import Image from "next/image";
import arrow from "../../../../assets/arrow.svg";
import { useOutsideClick } from "../../../../hooks/useOutsideClick";
import s from "./DesktopSelect.module.scss";
import CommonProps from "../IProps";
import OptionsList from "../../OptionsList/OptionsList";
import { IText } from "@/types/IText";

export type SelectOptionType = {
  value: string;
  text: string;
}

interface Props extends CommonProps {
  
}

const Select: FC<Props> = ({ img, values, selectedValue, setSelectedValue, className }) => {

  const [active, setActive] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setActive(false));

  const handleOptionClick = (value: IText) => {
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
        value={selectedValue.en}
      >
        {/* нужно для корректного определения ширины select`а */}
        <option
          value="All"
          className={selectedValue.en === "All" ? s.selected : ""}
        >
          {selectedValue.ru}
        </option>
        {
          values.map(value => (
            <option
              key={value.en}
              value={value.en}
              className={selectedValue.en === value.en ? s.selected : ""}
            >
              {value.ru}
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

export default Select;
