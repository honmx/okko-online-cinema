import React from 'react';
import styles from "../../styles/Header.module.scss";
import Image from "next/image";
import Button from "@/components/UI/Button/Button";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import IconButton from "@/components/UI/IconButton/IconButton";

const Header = () => {
    return (
        <>
            <div className={styles.header}>
                <nav className={styles.header_nav}>
                    <a className={styles.logo} href="@/components/Header/Header#">
                        <Image src="/main_logo.png" width={85} height={34} alt="okko"/>
                    </a>
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
                            <CustomLink href={"/sport?_ga=2.195337577.471721308.1681214140-1369534196.1681214140"}>
                                Спорт
                            </CustomLink>
                        </li>
                        <li>
                            <CustomLink href={"/tv_channels/tvchannels_all/31266743"}>
                                Спорт
                            </CustomLink>
                        </li>
                    </ul>
                    <div className={styles.right_part}>
                        {/*  /!*todo Добавить компонент поиска*!/*/}
                        <IconButton className={styles.search}>
                            <Image width={30} height={30} src="/search_icon.svg" alt="search"/>
                        </IconButton>
                        <div className={styles.search__after}></div>
                        <div className={styles.subscription}>
                            <Button value={"Месяц за 1 ₽"}/>
                        </div>
                        <div className={styles.subscription__after}></div>
                        <IconButton className={styles.promo}>
                            <Image width={30} height={30} src="/gift-box.svg" alt="gift"/>
                            <span>Ввести промокод</span>
                        </IconButton>
                        <IconButton className={styles.login}>
                            <Image width={30} height={30} src="/login_icon.svg" alt="gift"/>
                            <span>Войти</span>
                        </IconButton>
                        {/*todo добавить компонент бургера*/}
                        <IconButton className={styles.burger}>
                            <Image width={30} height={30} src="/burger_menu.svg" alt="burger"/>
                        </IconButton>

                    </div>
                </nav>
            </div>
        </>
    );
};
export default Header;