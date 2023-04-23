import { IText } from "@/types/IText";

export default interface Props {
  img?: string;
  values: IText[];
  selectedValue: IText;
  setSelectedValue: (value: IText) => void;
  className?: string;
}