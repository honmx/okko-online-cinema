import { FC, useEffect } from "react";
import s from "./Burger.module.scss";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import { useRouter } from "next/router";
import IconButton from "../UI/IconButton/IconButton";
import { capitalize } from "@/helpers/capitalize";
import { useTranslation } from "next-i18next";
import { useAppSelector } from "@/store/hooks";

interface IProps {
  handleLoginClick: () => void;
  handleLogoutClick: () => void;
}

const Burger: FC<IProps> = ({ handleLoginClick, handleLogoutClick }) => {

  const router = useRouter();

  const isAuth = useAppSelector(state => state.auth.isAuth);

  const { t } = useTranslation();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const headerLinks = [
    {
      href: "/",
      text: t("header:links.main"),
    },
    {
      href: "/movies",
      text: t("header:links.movies"),
    },
    {
      href: "https://okko.tv/store",
      text: t("header:links.store"),
    },
    {
      href: "https://okko.sport/sport",
      text: t("header:links.sport"),
    },
    {
      href: "https://okko.tv/tv_channels/tvchannels_all",
      text: t("header:links.tvChannels"),
    },
  ];

  return (
    <div className={s.burger}>
      <ul className={s.list}>
        {
          headerLinks.map(link => (
            <li
              key={link.href}
              className={
                (link.href === router.pathname
                  || link.href.startsWith(router.pathname) && router.pathname !== "/" ? s.active : "")
                + " " + s.item
              }
            >
              <CustomLink href={link.href}>{link.text}</CustomLink>
            </li>
          ))
        }
        <li className={s.item}>
          <IconButton className={s.loginBtn}>{capitalize(t("header:enterPromocode"))}</IconButton>
        </li>
        <li className={s.item}>
          {
            isAuth
              ? <IconButton onClick={handleLogoutClick} className={s.loginBtn}>{capitalize(t("header:logout"))}</IconButton>
              : <IconButton onClick={handleLoginClick} className={s.loginBtn}>{capitalize(t("header:login"))}</IconButton>
          }
        </li>
      </ul>
    </div>
  );
};

export default Burger;