import React, { FC, useState } from 'react';
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import IconButton from "@/components/UI/IconButton/IconButton";
import { useRouter } from 'next/router';
import { headerLinks } from '@/helpers/data/headerLinks';
import Link from 'next/link';
import burger from "@/assets/burger_menu.svg";
import gift from "@/assets/gift-box.svg";
import login from "@/assets/login_icon.svg";
import main_logo from "@/assets/main_logo.png";
import search from "@/assets/search_icon.svg";
import close from "@/assets/close.svg";
import logoutIcon from "@/assets/logout.svg";
import s from "./Header.module.scss";
import Burger from "@/components/Burger/Burger";
import Login from "@/components/Login/Login";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import Promocode from "@/components/Promocode/Promocode";
import SubscriptionSection from "@/components/SubscriptionSection/SubscriptionSection";
import Toggle from '../UI/Toggle/Toggle';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { toggleLanguage } from '@/store/slices/languageSlice';
import { useScrollStart } from '@/hooks/useScrollStart';
import { logout } from '@/store/thunks/logout';

interface Props {

}

const Header: FC<Props> = () => {

  const router = useRouter();

  const dispatch = useAppDispatch();

  const isSmaller = useSmallerDevice(959);
  const isMedium = useSmallerDevice(1099);

  const lang = useAppSelector(state => state.language.language);
  const isAuth = useAppSelector(state => state.auth.isAuth);

  const [burgerShowing, setBurgerShowing] = useState<boolean>(false);
  const [loginShowing, setLoginShowing] = useState<boolean>(false);
  const [promocodeShowing, setPromoCodeShowing] = useState<boolean>(false);
  const [subscriptionShowing, setSubscriptionShowing] = useState<boolean>(false);

  useScrollStart(loginShowing || promocodeShowing || subscriptionShowing);

  const handleBurgerClick = () => {
    setBurgerShowing(prevState => !prevState);
  };

  const handleLoginClick = () => {
    setLoginShowing(prevState => !prevState);
  }

  const handleLogoutClick = () => {
    dispatch(logout());
  }

  const handlePromocodeClick = () => {
    setPromoCodeShowing(prevState => !prevState);
  }

  const handleSubscriptionClick = () => {
    setSubscriptionShowing(prevState => !prevState);
  }

  return (
    <div className={s.header}>
      <nav className={s.header_nav}>
        <Link className={s.logo} href="/">
          <Image src={main_logo} width={85} height={34} alt="okko" />
        </Link>
        {
          !isSmaller &&
          <ul className={s.links}>
            {
              headerLinks.map(link => (
                <li key={link.href}
                  className={link.href === router.pathname || link.href.startsWith(router.pathname) && router.pathname !== "/" ? s.active : ""}>
                  <CustomLink href={link.href}>{link.text}</CustomLink>
                </li>
              ))
            }
          </ul>
        }
        <div className={s.right_part}>
          <div>
            <IconButton>
              <Image width={30} height={30} src={search} alt="search" />
            </IconButton>
          </div>
          {
            !isSmaller &&
            <Toggle
              values={["ru", "en"]}
              activeValue={lang}
              onClick={() => dispatch(toggleLanguage())}
            />
          }
          {
            !isMedium &&
            <div className={s.subscription} onClick={handleSubscriptionClick}>
              <Button value={"Месяц за 1 ₽"} />
            </div>
          }
          {
            !isMedium &&
            <div className={s.subscription__after}></div>
          }
          {/*todo при открытие бургера убирать логин и поиск, добовлять кнопку подписка */}
          {
            !isSmaller &&
            <div onClick={handlePromocodeClick}>
              <IconButton className={s.promo}>
                <Image width={30} height={30} src={gift} alt="promocode" />
                <span>Ввести промокод</span>
              </IconButton>
            </div>
          }
          {
            !isAuth &&
            <IconButton onClick={handleLoginClick} className={s.login}>
              <Image width={30} height={30} src={login} alt="gift" />
              {
                !isSmaller &&
                <span>Войти</span>
              }
            </IconButton>
          }
          {
            isAuth &&
            <IconButton onClick={handleLogoutClick} className={s.login}>
              <Image width={23} height={23} src={logoutIcon} alt="logout" />
              {
                !isSmaller &&
                <span>Выйти</span>
              }
            </IconButton>
          }
          {
            isSmaller &&
            <div onClick={handleBurgerClick}>
              <IconButton className={s.burger}>
                {
                  burgerShowing ?
                    <Image width={25} height={25} src={close} alt="close" />
                    :
                    <Image width={30} height={30} src={burger} alt="burger" />
                }
              </IconButton>
            </div>
          }

        </div>
      </nav>
      {
        burgerShowing &&
        <div className={s.burger_container + (burgerShowing ? '' : ' ' + s.hidden)}>
          <Burger />
        </div>
      }
      {
        loginShowing &&
        <div className={s.login_container}>
          <div className={s.login_container_inner}>
            <Login onClose={handleLoginClick} />
          </div>
        </div>
      }
      {
        promocodeShowing &&
        <div className={s.login_container}>
          <div className={s.login_container_inner}>
            <Promocode onClose={handlePromocodeClick} />
          </div>
        </div>
      }
      {
        subscriptionShowing &&
        <div className={s.login_container}>
          <div className={s.login_container_inner}>
            <SubscriptionSection onClose={handleSubscriptionClick} />
          </div>
        </div>
      }
    </div>
  );
};

export default Header;