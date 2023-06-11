import React, { Dispatch, FC, FormEvent, SetStateAction } from "react";
import { useTranslation } from "next-i18next";
import InputField from "../UI/InputField/InputField";
import Button from "../UI/Button/Button";
import authService from "@/services/authService";
import { useDisabledButton } from "@/hooks/useDisabledButton";
import s from "./CheckEmailForm.module.scss";

interface Props {
  email: string;
  handleEmailChange: (value: string) => void;
  setEmailExists: Dispatch<SetStateAction<boolean | null>>;
  className?: string;
}

const CheckEmailForm: FC<Props> = ({ email, handleEmailChange, setEmailExists, className }) => {

  const { t } = useTranslation("header");

  const [isDisabled, setIsDisabled] = useDisabledButton(email);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsDisabled(true);

    var { data: result } = await authService.checkEmail(email.trim());

    if (result) setEmailExists(true);
    else setEmailExists(false);

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

export default CheckEmailForm;
