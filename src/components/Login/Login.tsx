import React, { ChangeEvent, FC, FormEvent, useEffect, useState } from 'react';
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

interface Props {
  onClose: () => void;
}

const Login: FC<Props> = ({ onClose }) => {

  const [emailExists, setEmailExists] = useState<boolean | null>(null);

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className={s.loginWrapper}>
      <div className={s.loginContainer}>
        <div className={s.closeBtnContainer}>
          <Button shape="circle" p="13px" img={close} onClick={handleCloseClick} />
        </div>
        <div className={s.loginTitleContainer}>
          <Title fw={400} fs="20px">ВХОД ИЛИ РЕГИСТРАЦИЯ</Title>
        </div>
        <div className={s.authorizeContainer}>
          <div className={s.authorizeCard}>
            <Title fs="24px" className={s.loginOrRegisterTitle}>Войдите или зарегистрируйтесь</Title>
            <p>Чтобы начать пользоваться сервисом Okko</p>
            {
              emailExists === null &&
              <CheckEmailForm setEmailExists={setEmailExists} className={s.form} />
            }
            {
              emailExists === false &&
              <RegisterForm className={s.form} />
            }
            {
              emailExists === null && <>
                <CustomLink href="/" target="_blank" className={s.loginWith}>
                  <Image src={vkontakte} alt="vk" />
                  Войти через VK
                </CustomLink>
                <CustomLink href="/" target="_blank" className={s.loginWith}>
                  <Image src={google} alt="google" />
                  Войти через Google
                </CustomLink>
              </>
            }
            <div className={s.agreement}>
              Продолжая, я соглашаюсь с
              <CustomLink href="/">Пользовательским соглашением</CustomLink>
              и <CustomLink href="/">Политикой конфиденциальности</CustomLink>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;