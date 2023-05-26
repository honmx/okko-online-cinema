import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import s from "./RegisterForm.module.scss";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import { useDisabledButton } from "@/hooks/useDisabledButton";
import authService from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { register } from "@/store/thunks/register";

interface Props {
  email: string;
  handleEmailChange: (value: string) => void;
  className?: string;
}

const RegisterForm: FC<Props> = ({ email, handleEmailChange, className }) => {

  const dispatch = useAppDispatch();

  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");

  const [isDisabled, setIsDisabled] = useDisabledButton([email, password, passwordRepeat]);

  const handlePasswordChange = (value: string) => setPassword(value);
  const handlePasswordRepeatChange = (value: string) => setPasswordRepeat(value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setIsDisabled(true);

    dispatch(register({ email, password }));

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
      <InputField
        type="text"
        placeholder="Пароль"
        value={password}
        onChange={handlePasswordChange}
      />
      <InputField
        type="text"
        placeholder="Повторите пароль"
        value={passwordRepeat}
        onChange={handlePasswordRepeatChange}
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

export default RegisterForm;
