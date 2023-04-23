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
import MobileRange from "@/components/UI/Range/MobileRange/MobileRange";
import { sortByValues } from "@/helpers/data/sortByValues";
import { useScrollStart } from "@/hooks/useScrollStart";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import s from "./MobileFilters.module.scss";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { IText } from "@/types/IText";
import { setMinRating, setSelectedGenre, setSortBy } from "@/store/slices/moviesFilterSlice";

interface Props {

}

const MobileFilters: FC<Props> = ({ }) => {

  const dispatch = useAppDispatch();

  const {
    genre,
    country,
    minRating,
    minCountOfRating,
    producer,
    actor,
    sortBy,
  } = useSelectedFilters();

  const [activeParameters, setActiveParameters] = useState<boolean>(false);

  useScrollStart(activeParameters);

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
              values={genres.map(genre => ({ ru: genre.title.ru, en: genre.title.en }))}
              selectedValue={genre}
              setSelectedValue={(value: IText) => dispatch(setSelectedGenre(value))}
              className={s.select}
            />
            {/* <MobileSelect
              title="Жанры 2"
              values={genres.map(genre => ({ ru: genre.title.ru, en: genre.title.en }))}
              selectedValue={genre1}
              setSelectedValue={setGenre1}
              className={s.select}
            /> */}
            {/* <MobileSelect
              title="Жанры 3"
              values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
              selectedValue={genre2}
              setSelectedValue={setGenre2}
              className={s.select}
            /> */}
            <MobileSelect
              title="Сортировка"
              values={sortByValues.map(value => ({ ru: value.ru, en: value.en }))}
              selectedValue={sortBy}
              setSelectedValue={(value: IText) => dispatch(setSortBy(value))}
              className={s.select}
            />
            <MobileRange
              title="Рейтинг"
              value={minRating}
              setValue={(value: number) => dispatch(setMinRating(value))}
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
