import React, { FC, MouseEvent, useRef, useState } from "react";
import CommonProps from "../IProps";
import { useOutsideClick } from "@/hooks/useOutsideClick";
import { SelectOptionType } from "../DesktopSelect/DesktopSelect";
import Title from "../../Title/Title";
import OptionsList from "../../OptionsList/OptionsList";
import s from "./MobileSelect.module.scss";

interface Props extends Omit<CommonProps, "img"> {
  title: string;
}

const MobileSelect: FC<Props> = ({ values, selectedValue, setSelectedValue, title, className }) => {

  const [active, setActive] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setActive(false));

  const handleOptionClick = (value: SelectOptionType) => {
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
      <p className={s.selectedValue}>{selectedValue.text}</p>
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