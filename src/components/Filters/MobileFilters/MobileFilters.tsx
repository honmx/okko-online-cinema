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
import { clearFilters, setMinCountOfRating, setMinRating, setSelectedCountry, setSelectedGenre, setSortBy } from "@/store/slices/moviesFilterSlice";
import Link from "next/link";
import TextButton from "@/components/UI/TextButton/TextButton";
import { useRouter } from "next/router";
import { areFiltersClear } from "@/helpers/areFiltersClear";

interface Props {

}

const MobileFilters: FC<Props> = ({ }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    selectedGenre,
    selectedCountry,
    minRating,
    minCountOfRating,
    selectedProducer,
    selectedActor,
    sortBy,
  } = useSelectedFilters();

  const [activeParameters, setActiveParameters] = useState<boolean>(false);

  useScrollStart(activeParameters);

  const handleParametersClick = () => {
    setActiveParameters(prev => !prev);

    if (areFiltersClear({
      selectedGenre, selectedCountry, minRating,
      minCountOfRating, selectedProducer, selectedActor, sortBy
    })) return;

    router.push("/movies/filters");
  }

  const handleResetFiltersClick = () => {
    dispatch(clearFilters());
  }

  return (
    <>
      {
        activeParameters &&
        <div className={s.filtersContainer}>
          <div className={s.header}>
            <Title className={s.title}>Фильтры</Title>
            <TextButton fs="14px" onClick={handleResetFiltersClick} className={s.textButton}>Сбросить фильтры</TextButton>
            <Button shape="circle" img={close} p="10px" className={s.closeButton} onClick={handleParametersClick} />
          </div>
          <div className={s.optionsContainer}>
            <MobileSelect
              title="Жанры"
              values={genres.map(genre => ({ ru: genre.title.ru, en: genre.title.en }))}
              selectedValue={selectedGenre}
              setSelectedValue={(value: IText) => dispatch(setSelectedGenre(value))}
              className={s.select}
            />
            <MobileSelect
              title="Страны"
              values={genres.map(genre => ({ ru: genre.title.ru, en: genre.title.en }))}
              selectedValue={selectedGenre}
              setSelectedValue={(value: IText) => dispatch(setSelectedCountry(value))}
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
            <MobileRange
              title="Кол-во оценок"
              value={minCountOfRating}
              setValue={(value: number) => dispatch(setMinCountOfRating(value))}
              min={0}
              max={1000000}
              step={50000}
              className={s.select}
            />
            {/* поиск режиссеров */}
            {/* поиск актеров */}
            <MobileSelect
              title="Сортировка"
              values={sortByValues.map(value => ({ ru: value.ru, en: value.en }))}
              selectedValue={sortBy}
              setSelectedValue={(value: IText) => dispatch(setSortBy(value))}
              className={s.select}
            />
          </div>
          <Button value="Применить фильтры" bgColor="accent" className={s.applyButton} onClick={handleParametersClick} />
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
