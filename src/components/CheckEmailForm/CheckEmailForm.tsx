import React, { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from "react";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import authService from "@/services/authService";
import s from "./CheckEmailForm.module.scss";
import { useDisabledButton } from "@/hooks/useDisabledButton";

interface Props {
  setEmailExists: Dispatch<SetStateAction<boolean | null>>;
  className?: string;
}

const CheckEmailForm: FC<Props> = ({ setEmailExists, className }) => {

  const [value, setValue] = useState<string>("");
  const [isDisabled, setIsDisabled] = useDisabledButton(value);

  const handleChange = (value: string) => {
    setValue(value);
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    await authService.logout();

    setIsDisabled(true);
    var result = await authService.checkEmail(value.trim());

    if (result) setEmailExists(true);
    else if (result === false) setEmailExists(false);

    setIsDisabled(false);
  }

  return (
    <form onSubmit={handleSubmit} className={`${s.form} ${className}`}>
      <InputField
        type="text"
        placeholder="Электронная почта"
        value={value}
        onChange={handleChange}
      />
      <Button
        bgColor="accent"
        className={`${isDisabled && s.disabledBtn}`}
        value="Продолжить"
        disabled={isDisabled}
      />
    </form>
  )
};

export default CheckEmailForm;
