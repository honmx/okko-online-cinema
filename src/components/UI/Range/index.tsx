import React, { FC } from "react";
import { useSmallerDevice } from "../../../hooks/useSmallerDevice";
import MobileRange from "./MobileRange/MobileRange";
import DesktopRange from "./DesktopRange/DesktopRange";

export interface CommonProps {
  title: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}

const Range: FC<CommonProps> = ({ title, value, setValue, min, max, step, className }) => {

  const isSmaller = useSmallerDevice(959);

  return isSmaller
    ? <MobileRange
      title={title}
      value={value}
      setValue={setValue}
      min={min}
      max={max}
      step={step}
      className={className}
    />
    : <DesktopRange
      title={title}
      value={value}
      setValue={setValue}
      min={min}
      max={max}
      step={step}
      className={className}
    />
};

export default Range;
