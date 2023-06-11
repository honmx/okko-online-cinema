import React, { FC } from "react";
import MobileSelect from "./MobileSelect/MobileSelect";
import DesktopSelect from "./DesktopSelect/DesktopSelect";
import { useSmallerDevice } from "../../../hooks/useSmallerDevice";
import { IGenre } from "../../../types/IGenre";

export interface CommonProps {
  values: string[] | IGenre[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  title: string;
  img?: string;
  className?: string;
}

const Select: FC<CommonProps> = ({ values, selectedValue, setSelectedValue, title, img, className }) => {

  const isSmaller = useSmallerDevice(959);

  return isSmaller
    ? <MobileSelect
      title={title}
      values={values}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      className={className}
    />
    : <DesktopSelect
      values={values}
      selectedValue={selectedValue}
      setSelectedValue={setSelectedValue}
      className={className}
    />
};

export default Select;
