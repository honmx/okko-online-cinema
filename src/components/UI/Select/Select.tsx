import React, { FC, MouseEvent, useState, useRef } from "react";
import Image from "next/image";
import arrow from "../../../assets/arrow.svg";
import s from "./Select.module.scss";
import { useOutsideClick } from "../../../hooks/useOutsideClick";

export type SelectOptionType = {
  value: string;
  text: string;
}

interface Props {
  img?: string;
  values: SelectOptionType[];
  selectedValue: SelectOptionType;
  setSelectedValue: (value: SelectOptionType) => void;
  className?: string;
}

const Select: FC<Props> = ({ img, values, selectedValue, setSelectedValue, className }) => {

  const [active, setActive] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setActive(false));

  const handleOptionClick = (value: SelectOptionType) => {
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
        value={selectedValue.value}
      >
        <option
          value="All"
          className={selectedValue.value === "All" ? s.selected : ""}
        >
          {selectedValue.text}
        </option>
        {
          values.map(value => (
            <option
              key={value.value}
              value={value.value}
              className={selectedValue.value === value.value ? s.selected : ""}
            >
              {value.text}
            </option>
          ))
        }
      </select>
      <div className={`${s.arrow} ${active ? s.activeArrow : ""}`}>
        <Image src={arrow} alt="arrow" />
      </div>
      {
        active &&
        <div className={s.optionsContainer}>
          <button
            className={`${s.option} ${selectedValue.value === "All" ? s.selected : ""}`}
            onClick={() => handleOptionClick({ value: "All", text: "Все" })}
          >
            Все
          </button>
          {
            values.map(value => (
              <button
                key={value.value}
                className={`${s.option} ${selectedValue.value === value.value ? s.selected : ""}`}
                onClick={() => handleOptionClick(value)}
              >
                {value.text}
              </button>
            ))
          }
        </div>
      }
    </div>
  )
};

export default Select;
