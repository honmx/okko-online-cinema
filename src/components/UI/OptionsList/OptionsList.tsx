import React, { FC, MouseEvent, useRef } from "react";
import { SelectOptionType } from "../Select/DesktopSelect/DesktopSelect";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import Button from "../Button/Button";
import close from "../../../assets/close.svg";
import s from "./OptionsList.module.scss";
import Option from "../Option/Option";
import { IText } from "@/types/IText";
import { IGenre } from "@/types/IGenre";
import { isGenreType } from "@/helpers/isGenreType";
import { capitalize } from "@/helpers/capitalize";

interface Props {
  values: string[] | IGenre[];
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
            key={isGenreType(value) ? capitalize(value.genre) : value}
            value={isGenreType(value) ? capitalize(value.genre) : value}
            selectedValue={selectedValue}
            onClick={() => onOptionClick(isGenreType(value) ? capitalize(value.genre) : value)}
          />
        ))
      }
    </div>
  )
};

export default OptionsList;
