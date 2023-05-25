import {FC, useEffect} from "react";
import s from "./Burger.module.scss";
import {headerLinks} from "@/helpers/data/headerLinks";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import {useRouter} from "next/router";
import IconButton from "../UI/IconButton/IconButton";

interface IProps {
  handleLoginClick: () => void;
  handlePromocodeClick: () => void;
}

const Burger: FC<IProps> = ({ handleLoginClick, handlePromocodeClick }) => {

  const router = useRouter();

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

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
          <IconButton onClick={handlePromocodeClick} className={s.loginBtn}>ВВЕСТИ ПРОМОКОД</IconButton>
        </li>
        <li className={s.item}>
          <IconButton onClick={handleLoginClick} className={s.loginBtn}>ВОЙТИ</IconButton>
        </li>
      </ul>

    </div>
  );
};

export default Burger;