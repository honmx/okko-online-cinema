import React, { FC, MouseEvent, useRef } from "react";
import { SelectOptionType } from "../Select/DesktopSelect/DesktopSelect";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Button from "../Button/Button";
import close from "../../../assets/close.svg";
import s from "./OptionsList.module.scss";
import Option from "../Option/Option";
import { IText } from "@/types/IText";

interface Props {
  values: IText[];
  selectedValue: IText;
  onOptionClick: (arg: IText) => void;
  className?: string;
}

const OptionsList: FC<Props> = ({ values, selectedValue, onOptionClick, className }) => {

  return (
    <div className={`${s.optionsContainer} ${className}`}>
      <Option
        value={{ en: "All", ru: "Все" }}
        selectedValue={selectedValue}
        onClick={() => onOptionClick({ en: "All", ru: "Все" })}
      />
      {
        values.map(value => (
          <Option
            key={value.en}
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
