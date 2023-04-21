import React, { FC, useState } from "react";
import { NextPage } from "next";
import Image from "next/image";
import Title from "@/components/UI/Title/Title";
import TextButton from "@/components/UI/TextButton/TextButton";
import IconButton from "@/components/UI/IconButton/IconButton";
import vk from "@/assets/vk-icon.png";
import odnoklassniki from "@/assets/odnoklassniki-icon.png";
import viber from "@/assets/viber-icon.png";
import sort from "@/assets/sort.svg";
import s from "./Films.module.scss";
import Select, { SelectOptionType } from "@/components/UI/Select/Select";
import { genres } from "@/helpers/data/genres";
import { sortByValues } from "@/helpers/data/sortByValues";
import Range from "@/components/UI/Range/Range";

interface Props {

}

const Films: NextPage<Props> = ({ }) => {

  const [showText, setShowText] = useState<boolean>(false);
  const [genre, setGenre] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [genre1, setGenre1] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [genre2, setGenre2] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [sortBy, setSortBy] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [minRating, setMinRating] = useState<number>(0);

  const handleShowTextClick = () => {
    setShowText(prev => !prev);
  }

  return (
    <div className={s.filmsPage}>
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
      <div className={s.filtersContainer}>
        <div className={s.filters}>
          <Select
            values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
            selectedValue={genre}
            setSelectedValue={setGenre}
            className={s.select}
          />
          <Select
            values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
            selectedValue={genre1}
            setSelectedValue={setGenre1}
            className={s.select}
          />
          <Select
            values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
            selectedValue={genre2}
            setSelectedValue={setGenre2}
            className={s.select}
          />
          <Range
            value={minRating}
            setValue={setMinRating}
            min={0}
            max={10}
            step={0.1}
            className={s.select}
          />
        </div>
        <div className={s.sort}>
          <Select
            img={sort}
            values={sortByValues.map(value => ({ value: value.value, text: value.text }))}
            selectedValue={sortBy}
            setSelectedValue={setSortBy}
            className={s.select}
          />
        </div>
      </div>
    </div>
  )
};

export default Films;
