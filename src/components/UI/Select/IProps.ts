import { IGenre } from "@/types/IGenre";
import { IText } from "@/types/IText";

export default interface Props {
  img?: string;
  values: string[] | IGenre[];
  selectedValue: string;
  setSelectedValue: (value: string) => void;
  className?: string;
}