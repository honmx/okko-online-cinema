import React, { FC } from "react";
import { useSmallerDevice } from "../../../hooks/useSmallerDevice";
import { IGenre } from "../../../types/IGenre";
import dynamic from "next/dynamic";

export interface CommonProps {
  values: string[] | IGenre[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  title: string;
  img?: string;
  className?: string;
}


const DesktopSelect = dynamic(() => import("./DesktopSelect/DesktopSelect"), {
  ssr: false,
});

const MobileSelect = dynamic(() => import("./MobileSelect/MobileSelect"), {
  ssr: false,
});

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
