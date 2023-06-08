import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from "react";
import s from "./RegisterForm.module.scss";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import { useDisabledButton } from "@/hooks/useDisabledButton";
import authService from "@/services/authService";
import { useAppDispatch } from "@/store/hooks";
import { register } from "@/store/thunks/register";
import Toggle from "../UI/Toggle/Toggle";

interface Props {
  email: string;
  handleEmailChange: (value: string) => void;
  className?: string;
}

const RegisterForm: FC<Props> = ({ email, handleEmailChange, className }) => {

  const roles = ["Пользователь", "Админ"] as ["Пользователь", "Админ"];

  const dispatch = useAppDispatch();

  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [role, setRole] = useState<"Пользователь" | "Админ">("Пользователь");

  const [isDisabled, setIsDisabled] = useDisabledButton([email, password, passwordRepeat]);

  const handlePasswordChange = (value: string) => setPassword(value);
  const handlePasswordRepeatChange = (value: string) => setPasswordRepeat(value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setIsDisabled(true);
    role === "Пользователь"
      ? dispatch(register({ email, password }))
      : dispatch(register({ email, password }));
    setIsDisabled(false);
  }

  const handleToggleRoleClick = () => {
    setRole(role === roles[0] ? roles[1] : roles[0]);
  }

  return (
    <>
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
      <Toggle values={roles} activeValue={role} onClick={handleToggleRoleClick} textPosition="right" className={s.toggle} />
    </>
  )
};

export default RegisterForm;
