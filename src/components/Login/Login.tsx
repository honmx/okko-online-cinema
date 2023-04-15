import React, { FC } from 'react';
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import close from '@/assets/close.svg';
import { loginLinks } from '@/helpers/data/loginLinks.ts';
import s from "./Login.module.scss";
import Image from "next/image";
import sberbank from '@/assets/sberbank.svg';
import vkontakte from '@/assets/vk.svg';
import google from '@/assets/google.svg';
import yandex from '@/assets/yandex.svg';
import odnoklassniki from '@/assets/odnoklassniki.svg';
import twitter from '@/assets/twitter.svg';
import IconButton from "@/components/UI/IconButton/IconButton";

type LoginProps = {
  onClose: () => void;
}

const Login: FC<LoginProps> = ({ onClose }: LoginProps) => {

  const getImageSrc = (icon: string) => {
    switch (icon) {
      case 'sberbank':
        return sberbank;
      case 'vkontakte':
        return vkontakte;
      case 'google':
        return google;
      case 'yandex':
        return yandex;
      case 'twitter':
        return twitter;
      case 'odnoklassniki':
        return odnoklassniki;
      default:
        return '';
    }
  };

  const handleCloseClick = () => {
    onClose();
  };

  return (
    <div className={s.login}>
      <div className={s.login__close} onClick={handleCloseClick}>
        <IconButton>
          <Image width={18} height={18} alt={close} src={close} />
        </IconButton>
      </div>
      <div className={s.login__block}>
        <div className={s.login__block_title}>
          <h2>ВХОД ИЛИ РЕГИСТРАЦИЯ</h2>
        </div>
        <div className={s.login__block_input}>
          <div className={s.login__block_input_area}>
            <h2>Войдите или зарегистрируйтесь</h2>
            <p>
              Чтобы начать пользоваться сервисом Okko
            </p>
            <form>
              <input type={'text'} placeholder={'Электронная почти или телефон'} />
              <button>
                <span>
                  Продолжить
                </span>
              </button>
            </form>
            <ul className={s.login__block_input_area_links}>
              {
                loginLinks.map(link => (
                  <li key={link.href}
                  >
                    <CustomLink href={link.href} className={s.link}>
                      <Image width={20} height={20} src={getImageSrc(link.icon)} alt={link.icon} />
                      <span>{link.text}</span>
                    </CustomLink>
                  </li>
                ))

              }
            </ul>
            <div className={s.login__block_input_area_policy}>
              <div>
                <p className={s.agreement}>
                  <span>Продолжая, я соглашаюсь c</span>
                  <CustomLink href='/terms'>
                    Пользовательским соглашением
                  </CustomLink>
                  <span>и</span>
                  <CustomLink href='/privacy'>
                    Политикой конфиденциальности
                  </CustomLink>
                </p>
              </div>
              <div className={s.login__block_input_area_newsletter}>
                <input type="checkbox" name="news" id="news" />
                <label for="news"><span>Хочу узнавать о новинках и актуальных предложениях в соответствии с</span>
                  <CustomLink href={'/notifications'}>
                    Правилами рассылок
                  </CustomLink>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Login;