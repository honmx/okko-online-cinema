import React, { FC, ReactNode, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import Title from "@/components/UI/Title/Title";
import TextButton from "@/components/UI/TextButton/TextButton";
import IconButton from "@/components/UI/IconButton/IconButton";
import Filters from "../Filters/Filters";
import BreadCrumbs from "../UI/BreadCrumbs/BreadCrumbs";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import { useGenresAndCountries } from "@/hooks/useGenresAndCountries";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters } from "@/store/slices/moviesFilterSlice";
import vk from "@/assets/vk-icon.png";
import odnoklassniki from "@/assets/odnoklassniki-icon.png";
import viber from "@/assets/viber-icon.png";
import s from "./MoviesPageLayout.module.scss";

interface Props {
  children: ReactNode;
}

const MoviesPageLayout: FC<Props> = ({ children }) => {

  const router = useRouter();
  const dispatch = useAppDispatch();

  const { t } = useTranslation("moviesPage");

  const { genres, countries } = useGenresAndCountries();
  const { selectedGenre, selectedCountry, selectedProducer, selectedActor } = useSelectedFilters();

  const lastBreadCrumb =
    selectedGenre !== "Все" && selectedGenre
    || selectedActor
    || selectedCountry !== "Все" && selectedCountry
    || selectedProducer;

  const [showText, setShowText] = useState<boolean>(false);

  const handleShowTextClick = () => {
    setShowText(prev => !prev);
  }

  const handleBreadCrumbClick = () => {
    dispatch(clearFilters());
  }

  const moviesPageBreadCrumbs = [
    {
      value: t("moviesPage:mainPage"),
      href: "/"
    },
    {
      value: t("moviesPage:moviesPage"),
      href: "/movies"
    }
  ];

  return (
    <div className={s.moviesPage}>
      <div className={s.header}>
        <div className={s.textContainer}>
          <Title className={s.title}>{t("moviesPage:title")}</Title>
          <p className={`${s.description} ${showText ? s.show : ""}`}>{t("moviesPage:description")}<br />{t("moviesPage:enjoyWatching")}</p>
          {
            !showText &&
            <TextButton onClick={handleShowTextClick} className={s.textButton}>{t("moviesPage:readMore")}</TextButton>
          }
        </div>
        <div className={s.shareContainer}>
          <div className={s.share}>
            <p className={s.shareText}>{t("moviesPage:share")}</p>
            <div className={s.socialNetworksContainer}>
              <IconButton className={s.iconButton}>
                <Image src={vk} alt="vk" />
              </IconButton>
              <IconButton className={s.iconButton}>
                <Image src={odnoklassniki} alt="odnoklassniki" />
              </IconButton>
              <IconButton className={s.iconButton}>
                <Image src={viber} alt="viber" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
      {
        router.pathname !== "/movies" && (selectedGenre !== "Все" || selectedCountry !== "Все" || selectedActor !== "" || selectedProducer !== "")
          ? <BreadCrumbs values={[...moviesPageBreadCrumbs, { value: lastBreadCrumb, href: "" }]} className={s.breadCrumbs} onClick={handleBreadCrumbClick} />
          : <BreadCrumbs values={moviesPageBreadCrumbs} className={s.breadCrumbs} onClick={handleBreadCrumbClick} />
      }
      <Filters genres={genres} countries={countries} />
      <div className={s.childrenContainer}>{children}</div>
    </div>
  )
};

export default MoviesPageLayout;