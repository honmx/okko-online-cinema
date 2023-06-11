import React, { FC, FormEvent, useState } from "react";
import { useTranslation } from 'next-i18next';
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import Toggle from "../UI/Toggle/Toggle";
import { useDisabledButton } from "@/hooks/useDisabledButton";
import { useAppDispatch } from "@/store/hooks";
import { register } from "@/store/thunks/register";
import { registerAdmin } from "@/store/thunks/registerAdmin";
import s from "./RegisterForm.module.scss";

interface Props {
  email: string;
  handleEmailChange: (value: string) => void;
  className?: string;
}

const RegisterForm: FC<Props> = ({ email, handleEmailChange, className }) => {

  const roles = ["user", "admin"] as ["user", "admin"];

  const dispatch = useAppDispatch();

  const { t } = useTranslation("header");

  const [password, setPassword] = useState<string>("");
  const [passwordRepeat, setPasswordRepeat] = useState<string>("");
  const [role, setRole] = useState<"user" | "admin">("user");

  const [isDisabled, setIsDisabled] = useDisabledButton([email, password, passwordRepeat]);

  const handlePasswordChange = (value: string) => setPassword(value);
  const handlePasswordRepeatChange = (value: string) => setPasswordRepeat(value);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {

    e.preventDefault();

    setIsDisabled(true);
    role === "user"
      ? dispatch(register({ email, password }))
      : dispatch(registerAdmin({ email, password }));
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
        <InputField
          type="password"
          placeholder={t("header:loginWindow.passwordAgainInputPlaceholder")}
          value={passwordRepeat}
          onChange={handlePasswordRepeatChange}
        />
        <Button
          bgColor="accent"
          className={`${isDisabled && s.disabledBtn}`}
          disabled={isDisabled}
        >
          {t("header:loginWindow.continue")}
        </Button>
      </form>
      <Toggle values={roles} activeValue={t(role)} onClick={handleToggleRoleClick} textPosition="right" className={s.toggle} />
    </>
  )
};

export default RegisterForm;
