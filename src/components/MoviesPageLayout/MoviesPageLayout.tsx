import React, { FC, ReactNode, useState } from "react";
import Image from "next/image";
import Title from "@/components/UI/Title/Title";
import TextButton from "@/components/UI/TextButton/TextButton";
import IconButton from "@/components/UI/IconButton/IconButton";
import vk from "@/assets/vk-icon.png";
import odnoklassniki from "@/assets/odnoklassniki-icon.png";
import viber from "@/assets/viber-icon.png";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import DesktopFilters from "../Filters/DesktopFilters/DesktopFilters";
import MobileFilters from "../Filters/MobileFilters/MobileFilters";
import s from "./MoviesPageLayout.module.scss";

interface Props {
  children: ReactNode;
}

const MoviesPageLayout: FC<Props> = ({ children }) => {

  const isSmaller = useSmallerDevice(959);

  const [showText, setShowText] = useState<boolean>(false);

  const handleShowTextClick = () => {
    setShowText(prev => !prev);
  }

  return (
    <div className={s.moviesPage}>
      <div className={s.header}>
        <div className={s.textContainer}>
          <Title className={s.title}>Фильмы</Title>
          <p className={`${s.description} ${showText ? s.show : ""}`}>Онлайн-кинотеатр Okko собрал для своих подписчиков коллекцию из тысяч фильмов самых разных жанров и направлений. Мы позаботились о том, чтобы для каждого из наших зрителей был возможен просмотр любимого фильма в отличном качестве, с живым объемным звуком. Зрелищные блокбастеры, лучшие комедии, остросюжетные триллеры, космическая фантастика, нестареющая классика и фильмы множества других жанров вы найдете в нашем каталоге. Начиная с немой комедии «Пожарный» мастера Чарли Чаплина до эпического научно-фантастического фильма «Аватар» Джеймса Кэмерона, с его невероятными визуальными эффектами. Ставший классикой фантастический комедийный боевик «Пятый элемент» Люка Бессонна и пронзительная драма «Калина красная». Зрелищный триллер «Крушение» и современная российская комедия «Чебурашка» ждут вас в нашем онлайн-кинотеатре.<br /> Приятного просмотра!</p>
          {
            !showText &&
            <TextButton onClick={handleShowTextClick} className={s.textButton}>Читать все</TextButton>
          }
        </div>
        <div className={s.shareContainer}>
          <div className={s.share}>
            <p className={s.shareText}>Поделиться: </p>
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
        isSmaller 
          ? <MobileFilters />
          : <DesktopFilters />
      }
      <div className={s.childrenContainer}>{children}</div>
    </div>
  )
};

export default MoviesPageLayout;
