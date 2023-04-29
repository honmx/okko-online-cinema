import { IText } from "./IText";

export type CardType = {
  value: string;
  title: IText;
  photo?: string;
  href: string;
}