import React from 'react';
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
import s from "../../styles/Header.module.scss";

const Header = () => {

  const router = useRouter();

  return (
    <div className={s.header}>
      <nav className={s.header_nav}>
        <Link className={s.logo} href="/">
          <Image src={main_logo} width={85} height={34} alt="okko" />
        </Link>
        <ul className={s.links}>
          {
            headerLinks.map(link => (
              <li key={link.href} className={link.href === router.pathname || link.href.startsWith(router.pathname) && router.pathname !== "/" ? s.active : ""}>
                <CustomLink href={link.href}>{link.text}</CustomLink>
              </li>
            ))
          }
        </ul>
        <div className={s.right_part}>
          {/*  /!*todo Добавить компонент поиска*!/*/}
          <IconButton className={s.search}>
            <Image width={30} height={30} src={search} alt="search" />
          </IconButton>
          <div className={s.search__after}></div>
          <div className={s.subscription}>
            <Button value={"Месяц за 1 ₽"} />
          </div>
          <div className={s.subscription__after}></div>
          <IconButton className={s.promo}>
            <Image width={30} height={30} src={gift} alt="promocode" />
            <span>Ввести промокод</span>
          </IconButton>
          <IconButton className={s.login}>
            <Image width={30} height={30} src={login} alt="gift" />
            <span>Войти</span>
          </IconButton>
          {/*todo добавить компонент бургера*/}
          <IconButton className={s.burger}>
            <Image width={30} height={30} src={burger} alt="burger" />
          </IconButton>
        </div>
      </nav>
    </div>
  );
};
export default Header;