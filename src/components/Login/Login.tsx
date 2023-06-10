import React, { ChangeEvent, FC, FormEvent, useEffect, useState, useTransition } from 'react';
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import close from '@/assets/close.svg';
import s from "./Login.module.scss";
import Image from "next/image";
import vkontakte from '@/assets/vk.svg';
import google from '@/assets/google.svg';
import Title from "@/components/UI/Title/Title";
import Button from '../UI/Button/Button';
import InputField from '../UI/InputField/InputField';
import authService from '@/services/authService';
import CheckEmailForm from '../CheckEmailForm/CheckEmailForm';
import RegisterForm from '../RegisterForm/RegisterForm';
import LoginForm from '../LoginForm/LoginForm';
import { useAppSelector } from '@/store/hooks';
import { useRouter } from 'next/router';
import IconButton from '../UI/IconButton/IconButton';
import { useTranslation } from 'next-i18next';

interface Props {
  onClose: () => void;
}

const Login: FC<Props> = ({ onClose }) => {

  const router = useRouter();

  const { t } = useTranslation("header");

  const authState = useAppSelector(state => state.auth);

  const [emailExists, setEmailExists] = useState<boolean | null>(null);

  const [email, setEmail] = useState<string>("");

  useEffect(() => {
    if (authState.isAuth) {
      onClose();
      router.push("/");
    }
  }, [authState.isAuth]);

  const handleEmailChange = (value: string) => {
    setEmail(value);
  }

  const handleCloseClick = () => {
    onClose();
  };

  const handleVKClick = () => {
    window.location.href = `https://oauth.vk.com/authorize?client_id=${process.env.NEXT_PUBLIC_VK_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_APP_URL}&display=page&scope=email&response_type=code&v=5.131`;
  }

  return (
    <div className={s.loginWrapper}>
      <div className={s.loginContainer}>
        <div className={s.closeBtnContainer}>
          <Button shape="circle" p="13px" img={close} onClick={handleCloseClick} />
        </div>
        <div className={s.loginTitleContainer}>
          <Title fw={400} fs="20px">
            {emailExists === null && t("header:loginWindow.loginOrRegisterHeader")}
            {emailExists === false && t("header:loginWindow.registerHeader")}
            {emailExists && t("header:loginWindow.loginHeader")}
          </Title>
        </div>
        <div className={s.authorizeContainer}>
          <div className={s.authorizeCard}>
            <Title fs="24px" className={s.loginOrRegisterTitle}>
              {emailExists === null && t("header:loginWindow.loginOrRegisterTitle")}
              {emailExists === false && t("header:loginWindow.registerTitle")}
              {emailExists && t("header:loginWindow.loginTitle")}
            </Title>
            <p>{t("header:loginWindow.subtitle")}</p>
            {
              emailExists === null &&
              <CheckEmailForm email={email} handleEmailChange={handleEmailChange} setEmailExists={setEmailExists} className={s.form} />
            }
            {
              emailExists === false &&
              <RegisterForm email={email} handleEmailChange={handleEmailChange} className={s.form} />
            }
            {
              emailExists &&
              <LoginForm email={email} handleEmailChange={handleEmailChange} className={s.form} />
            }
            {
              emailExists === null && <>
                <IconButton className={s.loginWith} onClick={handleVKClick}>
                  <Image src={vkontakte} alt="vk" />
                  <p>{t("header:loginWindow.loginWithVK")}</p>
                </IconButton>
                <IconButton className={s.loginWith}>
                  <Image src={google} alt="google" />
                  <p>{t("header:loginWindow.loginWithGoogle")}</p>
                </IconButton>
              </>
            }
            <div className={s.agreement}>
              {t("header:loginWindow.agreement.iAgreeWith")}
              <CustomLink href="/">{t("header:loginWindow.agreement.userAgreement")}</CustomLink>
              {t("header:loginWindow.agreement.and")} <CustomLink href="/">{t("header:loginWindow.agreement.privacyPolicy")}</CustomLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;