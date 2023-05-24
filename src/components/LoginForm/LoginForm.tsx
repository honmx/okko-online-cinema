import React, { FC, FormEvent, useState } from "react";
import s from "./LoginForm.module.scss";
import { useDisabledButton } from "@/hooks/useDisabledButton";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";

interface Props {
  className?: string;
}

const LoginForm: FC<Props> = ({ className }) => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const [isDisabled, setIsDisabled] = useDisabledButton([email, password]);

  const handleEmailChange = (value: string) => setEmail(value);
  const handlePasswordChange = (value: string) => setPassword(value);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setIsDisabled(true);
    
    // 

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
