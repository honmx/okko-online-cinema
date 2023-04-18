import React, { useState } from 'react';
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
import s from "./Header.module.scss";
import Search from "@/components/Search/Search";
import Burger from "@/components/Burger/Burger";
import Login from "@/components/Login/Login";
import {useSmallerDevice} from "@/hooks/useSmallerDevice";
import Promocode from "@/components/Promocode/Promocode";

const Header = () => {

  const [searchShowing, setSearchShowing] = useState<boolean>(false);
  const [burgerShowing, setBurgerShowing] = useState<boolean>(false);
  const [loginShowing, setLoginShowing] = useState<boolean>(false);
  const [promocodeShowing, setPromoCodeShowing] = useState<boolean>(false);

  const handleSearchIconClick = ():void => {
    setSearchShowing(prevState => !prevState);
  };

  const handleBurgerClick = ():void => {
    setBurgerShowing(prevState => !prevState);
  };

  const handleLoginClick = ():void => {
    setLoginShowing(prevState => !prevState);
  }

  const handlePromocodeClick = ():void => {
    setPromoCodeShowing(prevState => !prevState);
  }

  const isSmaller = useSmallerDevice(959);
  const isMedium = useSmallerDevice(1099);

  const router = useRouter();

  return (
    <div className={s.header}>
      <nav className={s.header_nav}>
        <Link className={s.logo} href="/">
          <Image src={main_logo} width={85} height={34} alt="okko" />
        </Link>
        {searchShowing && !isSmaller &&
          <div className={s.search_desktop}>
            <Search />
          </div>
        }
        {!searchShowing && !isSmaller &&
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
          <div onClick={handleSearchIconClick}>
            {searchShowing &&
              <IconButton>
                <Image width={25} height={25} src={close} alt="search" />
              </IconButton>
            }
            {!searchShowing &&
              <IconButton>
                <Image width={30} height={30} src={search} alt="search" />
              </IconButton>
            }
          </div>
          {!isSmaller &&
            <div className={s.search__after}></div>
          }
          {!isMedium &&
            <div className={s.subscription}>
              <Button value={"Месяц за 1 ₽"} />
            </div>
          }
          {!isMedium &&
            <div className={s.subscription__after}></div>
          }
          {/*todo при открытие бургера убирать логин и поиск, добовлять кнопку подписка */}
          {!isSmaller &&
            <div onClick={handlePromocodeClick}>
            <IconButton className={s.promo}>
              <Image width={30} height={30} src={gift} alt="promocode" />
              <span>Ввести промокод</span>
            </IconButton>
            </div>
          }

          <div onClick={handleLoginClick}>
            <IconButton className={s.login}>
              <Image width={30} height={30} src={login} alt="gift" />
              {!isSmaller  &&
                <span>Войти</span>
              }
            </IconButton>
          </div>
          {isSmaller &&
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
        searchShowing && isSmaller &&
        <div className={s.search_mobile}>
          <div>
            <Search />
          </div>
        </div>
      }
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

    </div>
  );
};
export default Header;