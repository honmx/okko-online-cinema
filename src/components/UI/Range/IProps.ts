import { Dispatch, SetStateAction } from "react";

export default interface Props {
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}