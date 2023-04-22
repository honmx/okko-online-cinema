import { SelectOptionType } from "./DesktopSelect/DesktopSelect";

export default interface Props {
  img?: string;
  values: SelectOptionType[];
  selectedValue: SelectOptionType;
  setSelectedValue: (value: SelectOptionType) => void;
  className?: string;
}