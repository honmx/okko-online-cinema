import React, { FC, MouseEvent, useRef } from "react";
import { SelectOptionType } from "../Select/DesktopSelect/DesktopSelect";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Button from "../Button/Button";
import close from "../../../assets/close.svg";
import s from "./OptionsList.module.scss";
import Option from "../Option/Option";

interface Props {
  values: SelectOptionType[];
  selectedValue: SelectOptionType;
  onOptionClick: (arg: SelectOptionType) => void;
  className?: string;
}

const OptionsList: FC<Props> = ({ values, selectedValue, onOptionClick, className }) => {

  return (
    <div className={`${s.optionsContainer} ${className}`}>
      <Option
        value={{ value: "All", text: "Все" }}
        selectedValue={selectedValue}
        onClick={() => onOptionClick({ value: "All", text: "Все" })}
      />
      {
        values.map(value => (
          <Option
            key={value.value}
            value={value}
            selectedValue={selectedValue}
            onClick={() => onOptionClick(value)}
          />
        ))
      }
    </div>
  )
};

export default OptionsList;
