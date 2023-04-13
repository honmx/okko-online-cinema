import React from 'react';
import styles from "../../styles/Header.module.scss";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import IconButton from "@/components/UI/IconButton/IconButton";
import Container from '../Container/Container';
import burger from "@/assets/burger_menu.svg";
import gift from "@/assets/gift-box.svg";
import login from "@/assets/login_icon.svg";
import main_logo from "@/assets/main_logo.png";
import search from "@/assets/search_icon.svg";
import Link from "next/link";

const Header = () => {
    return (
        <div className={styles.header}>
            <nav className={styles.header_nav}>
                <Link href="/" className={styles.logo}>
                    <Image src={main_logo} width={85} height={34} alt="okko"/>
                </Link>
                <ul className={styles.links}>
                    <li className={styles.active}>
                        <CustomLink href={"#"}>
                            Главная
                        </CustomLink>
                    </li>
                    <li>
                        <CustomLink href={"/catalog"}>
                            Каталог
                        </CustomLink>
                    </li>
                    <li>
                        <CustomLink href={"/store"}>
                            Магазин
                        </CustomLink>
                    </li>
                    <li>
                        <CustomLink href={"/sport"}>
                            Спорт
                        </CustomLink>
                    </li>
                    <li>
                        <CustomLink href={"/tv-channels"}>
                            Спорт
                        </CustomLink>
                    </li>
                </ul>
                <div className={styles.right_part}>
                    {/*  /!*todo Добавить компонент поиска*!/*/}
                    <IconButton className={styles.search}>
                        <Image width={30} height={30} src={search} alt="search"/>
                    </IconButton>
                    <div className={styles.search__after}></div>
                    <div className={styles.subscription}>
                        <Button value={"Месяц за 1 ₽"}/>
                    </div>
                    <div className={styles.subscription__after}></div>
                    <IconButton className={styles.promo}>
                        <Image width={30} height={30} src={gift} alt="gift"/>
                        <span>Ввести промокод</span>
                    </IconButton>
                    <IconButton className={styles.login}>
                        <Image width={30} height={30} src={login} alt="gift"/>
                        <span>Войти</span>
                    </IconButton>
                    {/*todo добавить компонент бургера*/}
                    <IconButton className={styles.burger}>
                        <Image width={30} height={30} src={burger} alt="burger"/>
                    </IconButton>
                </div>
            </nav>
        </div>
    );
};
export default Header;