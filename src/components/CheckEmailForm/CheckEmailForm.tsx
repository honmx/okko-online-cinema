import React, { Dispatch, FC, FormEvent, SetStateAction, useEffect, useState } from "react";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import authService from "@/services/authService";
import s from "./CheckEmailForm.module.scss";
import { useDisabledButton } from "@/hooks/useDisabledButton";

interface Props {
  email: string;
  handleEmailChange: (value: string) => void;
  setEmailExists: Dispatch<SetStateAction<boolean | null>>;
  className?: string;
}

const CheckEmailForm: FC<Props> = ({ email, handleEmailChange, setEmailExists, className }) => {

  const [isDisabled, setIsDisabled] = useDisabledButton(email);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsDisabled(true);

    var result = await authService.checkEmail(email.trim());

    if (result) setEmailExists(true);
    else if (result === false) setEmailExists(false);

    setIsDisabled(false);
  }

  return (
    <form onSubmit={handleSubmit} className={`${s.form} ${className}`}>
      <InputField
        type="text"
        placeholder="Электронная почта"
        value={email}
        onChange={handleEmailChange}
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
