import { Dispatch, SetStateAction } from "react";

export default interface Props {
  value: number;
  setValue: Dispatch<SetStateAction<number>>;
  min: number;
  max: number;
  step: number;
  className?: string;
}