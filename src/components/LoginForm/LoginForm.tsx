import React, { FC, FormEvent, useState } from "react";
import s from "./LoginForm.module.scss";
import { useDisabledButton } from "@/hooks/useDisabledButton";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { login } from "@/store/thunks/login";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";

interface Props {
  email: string;
  handleEmailChange: (value: string) => void;
  className?: string;
}

const LoginForm: FC<Props> = ({ email, handleEmailChange, className }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const { t } = useTranslation("header");

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
        placeholder={t("header:loginWindow.emailInputPlaceholder")}
        value={email}
        onChange={handleEmailChange}
      />
      <InputField
        type="password"
        placeholder={t("header:loginWindow.passwordInputPlaceholder")}
        value={password}
        onChange={handlePasswordChange}
      />
      <Button
        bgColor="accent"
        className={`${isDisabled && s.disabledBtn}`}
        disabled={isDisabled}
      >
        {t("header:loginWindow.continue")}
      </Button>
    </form>
  )
};

export default LoginForm;
