export default interface Props {
  title: string;
  value: number;
  setValue: (value: number) => void;
  min: number;
  max: number;
  step: number;
  className?: string;
}