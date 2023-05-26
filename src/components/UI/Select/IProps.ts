import { IText } from "@/types/IText";

export default interface Props {
  img?: string;
  values: string[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  className?: string;
}