import React, { FC, useEffect, useState } from "react";
import Button from "@/components/UI/Button/Button";
import close from "../../../assets/close.svg";
import Title from "@/components/UI/Title/Title";
import { SelectOptionType } from "@/components/UI/Select/DesktopSelect/DesktopSelect";
import { genres } from "@/helpers/data/genres";
import IconButton from "@/components/UI/IconButton/IconButton";
import parameters from "@/assets/parameters.svg";
import Image from "next/image";
import MobileSelect from "@/components/UI/Select/MobileSelect/MobileSelect";
import s from "./MobileFilters.module.scss";
import Range from "@/components/UI/Range/DesktopRange/DesktopRange";
import { sortByValues } from "@/helpers/data/sortByValues";
import MobileRange from "@/components/UI/Range/MobileRange/MobileRange";

interface Props {

}

const MobileFilters: FC<Props> = ({ }) => {

  useEffect(() => {
    window.scrollTo(0, 0);

    document.body.style.overflow = "hidden";

    return () => {
      document.body.style.overflow = "";
    }
  }, []);

  const [genre, setGenre] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [genre1, setGenre1] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [genre2, setGenre2] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [sortBy, setSortBy] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [minRating, setMinRating] = useState<number>(0);

  const [activeParameters, setActiveParameters] = useState<boolean>(false);

  const handleParametersClick = () => {
    setActiveParameters(prev => !prev);
  }

  return (
    <>
      {
        activeParameters &&
        <div className={s.filtersContainer}>
          <div className={s.header}>
            <Title className={s.title}>Фильтры</Title>
            <Button shape="circle" img={close} p="10px" className={s.closeButton} onClick={handleParametersClick} />
          </div>
          <div className={s.optionsContainer}>
            <MobileSelect
              title="Жанры"
              values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
              selectedValue={genre}
              setSelectedValue={setGenre}
              className={s.select}
            />
            <MobileSelect
              title="Жанры 2"
              values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
              selectedValue={genre1}
              setSelectedValue={setGenre1}
              className={s.select}
            />
            <MobileSelect
              title="Жанры 3"
              values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
              selectedValue={genre2}
              setSelectedValue={setGenre2}
              className={s.select}
            />
            <MobileSelect
              title="Сортировка"
              values={sortByValues.map(value => ({ value: value.value, text: value.text }))}
              selectedValue={sortBy}
              setSelectedValue={setSortBy}
              className={s.select}
            />
            <MobileRange
              title="Рейтинг"
              value={minRating}
              setValue={setMinRating}
              min={0}
              max={10}
              step={0.1}
              className={s.select}
            />
          </div>
        </div>
      }
      {
        !activeParameters &&
        <div className={s.parameters}>
          <IconButton onClick={handleParametersClick}>
            <Image src={parameters} alt="parameters" />
          </IconButton>
        </div>
      }

    </>
  )
};

export default MobileFilters;
