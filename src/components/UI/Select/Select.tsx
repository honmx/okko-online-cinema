import React, { ChangeEvent, MouseEvent, FC, useState, Dispatch, SetStateAction } from "react";
import Image from "next/image";
import arrow from "../../../assets/arrow.svg";
import s from "./Select.module.scss";

type SelectOptionType = {
  value: string;
  text: string;
}

interface Props {
  values: SelectOptionType[];
  selectedValue: SelectOptionType;
  setSelectedValue: (value: SelectOptionType) => void;
  className?: string;
}

const Select: FC<Props> = ({ values, selectedValue, setSelectedValue, className }) => {

  const [active, setActive] = useState<boolean>(false);

  const handleOptionClick = (value: SelectOptionType) => {
    setSelectedValue(value);
  }

  const handleSelectClick = (e: MouseEvent<HTMLSelectElement>) => {
    e.preventDefault();
    setActive(prev => !prev);
  }

  return (
    <div className={`${s.selectContainer} ${className}`}>
      <select
        className={s.select}
        onMouseDown={handleSelectClick}
        value={selectedValue.value}
      >
        <option
          value="All"
          className={selectedValue.value === "All" ? s.selected : ""}
        >
          Все
        </option>
        {
          values.map(value => (
            <option
              value={value.value}
              className={selectedValue.value === value.value ? s.selected : ""}
            >
              {value.text}
            </option>
          ))
        }
      </select>
      <div className={s.arrow}>
        <Image src={arrow} alt="arrow" />
      </div>
      {
        active &&
        <div className={s.optionsContainer}>
          <button
            className={`${s.option} ${selectedValue.value === "All" ? s.selected : ""}`}
            onClick={() => handleOptionClick({value: "All", text: "Все"})}
          >
            Все
          </button>
          {
            values.map(value => (
              <button
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
