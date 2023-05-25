import React, { FC, FormEvent, useState } from "react";
import s from "./LoginForm.module.scss";
import { useDisabledButton } from "@/hooks/useDisabledButton";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import authService from "@/services/authService";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/thunks/login";
import { useRouter } from "next/router";

interface Props {
  email: string;
  handleEmailChange: (value: string) => void;
  className?: string;
}

const LoginForm: FC<Props> = ({ email, handleEmailChange, className }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const [password, setPassword] = useState<string>("");

  const [isDisabled, setIsDisabled] = useDisabledButton([email, password]);

  const handlePasswordChange = (value: string) => setPassword(value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setIsDisabled(true);

    dispatch(login({ email, password }));

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
      <Button
        bgColor="accent"
        className={`${isDisabled && s.disabledBtn}`}
        value="Продолжить"
        disabled={isDisabled}
      />
    </form>
  )
};

export default LoginForm;
