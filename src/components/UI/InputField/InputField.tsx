import React, { ChangeEvent, FC, RefObject } from "react";
import s from "./InputField.module.scss";

interface Props {
  type: "text" | "password";
  placeholder: string;
  appearanceType?: "filled" | "transparent"
  value: string;
  onChange: (value: string) => void;
  className?: string;
}

const InputField: FC<Props> = ({ type, placeholder, appearanceType = "filled", value, onChange, className }) => {

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  }

  return (
    <div className={`${s.inputFieldWrapper} ${appearanceType === "transparent" ? s.transparent : ""} ${className}`}>
      <input type={type} placeholder={placeholder} value={value} onChange={handleChange} />
    </div>
  )
};

export default InputField;
