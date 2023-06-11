import { FC, useEffect } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "next-i18next";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import IconButton from "../UI/IconButton/IconButton";
import Toggle from "../UI/Toggle/Toggle";
import { capitalize } from "@/helpers/capitalize";
import { useAppSelector } from "@/store/hooks";
import s from "./Burger.module.scss";

interface IProps {
  handleLoginClick: () => void;
  handleLogoutClick: () => void;
  handleToggleLanguageClick: (value: string) => void;
}

const Burger: FC<IProps> = ({ handleLoginClick, handleLogoutClick, handleToggleLanguageClick }) => {

  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  
  const router = useRouter();

  const isAuth = useAppSelector(state => state.auth.isAuth);

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
        <Toggle
          values={["ru", "en"]}
          activeValue={lang}
          onClick={() => handleToggleLanguageClick(lang === "ru" ? "en" : "ru")}
        />
      </ul>
    </div>
  );
};

export default Burger;