import React from 'react';
import styles from "../styles/Header.module.scss";
import Image from "next/image";

const Header = () => {
  return (
    <div className={styles.header}>
      <nav className={styles.header_nav}>
        <a className={styles.logo} href="#">
          <Image src="/main_logo.png" width={85} height={34} alt="okko" />
        </a>
        <ul className={styles.links}>
          <li className={styles.active}>
            <a href="#">
              Главная
            </a>
          </li>
          <li>
            <a href="#">
              Каталог
            </a>
          </li>
          <li>
            <a href="#">
              Магазин
            </a>
          </li>
          <li>
            <a href="#">
              Спорт
            </a>
          </li>
          <li>
            <a href="#">
              ТВ каналы
            </a>
          </li>
        </ul>
        <div className={styles.right_part}>
          <div className={styles.search}>
            {/*todo Добавить компонент поиска*/}
            <Image width={30} height={30} src="/search_icon.svg" alt="search" />
          </div>
          <div className={styles.search__after}></div>
          <div className={styles.subscription}>
            {/*todo добавить компонент кнопки*/}
            <button>
              <div className={styles.subscription__animation}></div>
              <span className={styles.subscription__text}>Месяц за 1 ₽</span>
            </button>
          </div>
          <div className={styles.subscription__after}></div>
          <div className={styles.promo}>
            <Image width={30} height={30} src="/gift-box.svg" alt="gift" />
            <span>Ввести промокод</span>
          </div>
          <div className={styles.login}>
            <Image width={30} height={30} src="/login_icon.svg" alt="gift" />
            <span>Войти</span>
          </div>
          <div className={styles.burger}>
            {/*todo добавить компонент бургера*/}
            <Image width={30} height={30} src="/burger_menu.svg" alt="burger" />
          </div>
        </div>
      </nav>
    </div>
  );
};
export default Header;