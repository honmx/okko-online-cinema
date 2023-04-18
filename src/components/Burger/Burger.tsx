import React, {useEffect} from "react";
import s from "./Burger.module.scss";
import {headerLinks} from "@/helpers/data/headerLinks";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import {useRouter} from "next/router";

type BurgerProps = {};

const Burger: React.FC<BurgerProps> = () => {

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  return (
    <div className={s.burger}>
      <ul>
        {
          headerLinks.map(link => (
            <li key={link.href}
                className={link.href === router.pathname || link.href.startsWith(router.pathname) && router.pathname !== "/" ? s.active : ""}>
              <CustomLink href={link.href}>{link.text}</CustomLink>
            </li>
          ))
        }
        <li>
          {/*todo сделать компонент промокода*/}
          <CustomLink href={"#promo-code"}>ВВЕСТИ ПРОМОКОД</CustomLink>
        </li>
        <li>
          {/*todo сделать компонент логина*/}
          <CustomLink href={"/login"}>ВОЙТИ</CustomLink>
        </li>
      </ul>

    </div>
  );
};

export default Burger;