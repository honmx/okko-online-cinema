import React, {useState} from 'react';
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import IconButton from "@/components/UI/IconButton/IconButton";
import {useRouter} from 'next/router';
import {headerLinks} from '@/helpers/data/headerLinks';
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

const Header = () => {

    const [searchShowing, setSearchShowing] = useState<boolean>(false);
    const [burgerShowing, setBurgerShowing] = useState<boolean>(false);
    const [loginShowing, setLoginShowing] = useState<boolean>(false);

    const handleSearchIconClick = () => {
        setSearchShowing(prevState => !prevState);
    };

    const handleBurgerClick = () => {
        setBurgerShowing(prevState => !prevState);
    };

    const handleLoginClick = () => {
        setLoginShowing(prevState => !prevState);
    }

    const router = useRouter();

    return (
        <div className={s.header}>
            <nav className={s.header_nav}>
                <Link className={s.logo} href="/">
                    <Image src={main_logo} width={85} height={34} alt="okko"/>
                </Link>
                {searchShowing ?
                    <div className={s.search_desktop}>
                        <Search/>
                    </div>
                    :
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
                        {searchShowing ?
                            <IconButton>
                                <Image width={25} height={25} src={close} alt="search"/>
                            </IconButton>
                            :
                            <IconButton>
                                <Image width={30} height={30} src={search} alt="search"/>
                            </IconButton>
                        }
                    </div>
                    <div className={s.search__after}></div>
                    <div className={s.subscription}>
                        <Button value={"Месяц за 1 ₽"}/>
                    </div>
                    <div className={s.subscription__after}></div>
                    {/*todo при открытие бургера убирать логин и поиск, добовлять кнопку подписка */}
                    <IconButton className={s.promo}>
                        <Image width={30} height={30} src={gift} alt="promocode"/>
                        <span>Ввести промокод</span>
                    </IconButton>
                    <div onClick={handleLoginClick}>
                        <IconButton className={s.login}>
                            <Image width={30} height={30} src={login} alt="gift"/>
                            <span>Войти</span>
                        </IconButton>
                    </div>
                    <div onClick={handleBurgerClick}>
                        <IconButton className={s.burger}>
                            {
                                burgerShowing ?
                                    <Image width={25} height={25} src={close} alt="close"/>
                                    :
                                    <Image width={30} height={30} src={burger} alt="burger"/>
                            }
                        </IconButton>
                    </div>
                </div>
            </nav>
            <div className={s.search_mobile}>
                {
                    searchShowing &&
                    <div>
                        <Search/>
                    </div>
                }
            </div>
            <div className={s.burger_container + (burgerShowing ? '' : ' ' + s.hidden)}>
                {burgerShowing && <Burger/>}
            </div>
            {
                loginShowing &&
                <div className={s.login_container}>
                    <div className={s.login_container_inner}>
                        <Login onClose={handleLoginClick}/>
                    </div>
                </div>
            }

        </div>
    );
};
export default Header;