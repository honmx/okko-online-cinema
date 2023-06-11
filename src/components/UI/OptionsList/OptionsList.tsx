import React, { FC } from "react";
import Option from "../Option/Option";
import { IGenre } from "../../../types/IGenre";
import { isGenreType } from "../../../helpers/isGenreType";
import { capitalize } from "../../../helpers/capitalize";
import s from "./OptionsList.module.scss";

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
            key={isGenreType(value) ? capitalize(value.title) : value}
            value={isGenreType(value) ? capitalize(value.title) : value}
            selectedValue={selectedValue}
            onClick={() => onOptionClick(isGenreType(value) ? capitalize(value.title) : value)}
          />
        ))
      }
    </div>
  )
};

export default OptionsList;
