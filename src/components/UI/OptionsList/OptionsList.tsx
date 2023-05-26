import React, { FC, MouseEvent, useRef } from "react";
import { SelectOptionType } from "../Select/DesktopSelect/DesktopSelect";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Button from "../Button/Button";
import close from "../../../assets/close.svg";
import s from "./OptionsList.module.scss";
import Option from "../Option/Option";
import { IText } from "@/types/IText";

interface Props {
  values: string[];
  selectedValue: string;
  onOptionClick: (arg: string) => void;
  className?: string;
}

const OptionsList: FC<Props> = ({ values, selectedValue, onOptionClick, className }) => {

  return (
    <div className={`${s.optionsContainer} ${className}`}>
      <Option
        value="Все"
        selectedValue={selectedValue}
        onClick={() => onOptionClick("Все")}
      />
      {
        values.map(value => (
          <Option
            key={value}
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
