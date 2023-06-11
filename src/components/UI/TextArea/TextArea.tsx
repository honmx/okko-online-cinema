import React, { ChangeEvent, FC } from "react";
import s from "./TextArea.module.scss";

interface Props {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
}

const TextArea: FC<Props> = ({ value, onChange, placeholder, className }) => {

  const handleTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    onChange(e.target.value);
  }

  return (
    <div className={`${s.container} ${className}`}>
      <textarea value={value} onChange={handleTextAreaChange} placeholder={placeholder} className={s.textarea} />
    </div>
  )
};

export default TextArea;
