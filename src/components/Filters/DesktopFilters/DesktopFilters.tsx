import React, { FC, useEffect, useState } from "react";
import DesktopSelect, { SelectOptionType } from "@/components/UI/Select/DesktopSelect/DesktopSelect";
import { genres } from "@/helpers/data/genres";
import DesktopRange from "@/components/UI/Range/DesktopRange/DesktopRange";
import { sortByValues } from "@/helpers/data/sortByValues";
import sort from "@/assets/sort.svg";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { IText } from "@/types/IText";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters, setMinCountOfRating, setMinRating, setSelectedCountry, setSelectedGenre, setSortBy } from "@/store/slices/moviesFilterSlice";
import TextButton from "@/components/UI/TextButton/TextButton";
import s from "./DesktopFilters.module.scss";
import { useRouter } from "next/router";
import { areFiltersClear } from "@/helpers/areFiltersClear";

interface Props {

}

const DesktopFilters: FC<Props> = ({ }) => {

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

  useEffect(() => {
    if (areFiltersClear({
      selectedGenre, selectedCountry, minRating,
      minCountOfRating, selectedProducer, selectedActor, sortBy
    })) return;

    router.push("/movies/filters");
  }, [
    JSON.stringify({
      selectedGenre, selectedCountry,
      minRating, minCountOfRating,
      selectedProducer, selectedActor, sortBy
    })
  ]);

  return (
    <div className={s.filtersWrapper}>
      {/* вынести */}
      <div className={s.filtersContainer}>
        <div className={s.filters}>
          {/* genres */}
          <DesktopSelect
            values={genres.map(genre => ({ ru: genre.title.ru, en: genre.title.en }))}
            selectedValue={selectedGenre}
            setSelectedValue={(value: IText) => dispatch(setSelectedGenre(value))}
            className={s.select}
          />
          {/* countries */}
          <DesktopSelect
            values={genres.map(genre => ({ ru: genre.title.ru, en: genre.title.en }))}
            selectedValue={selectedGenre}
            setSelectedValue={(value: IText) => dispatch(setSelectedCountry(value))}
            className={s.select}
          />
          {/* minRating */}
          <DesktopRange
            title="Рейтинг"
            value={minRating}
            setValue={(value: number) => dispatch(setMinRating(value))}
            min={0}
            max={10}
            step={0.1}
            className={s.select}
          />
          {/* minCountOfRating */}
          <DesktopRange
            title="Кол-во оценок"
            value={minCountOfRating}
            setValue={(value: number) => dispatch(setMinCountOfRating(value))}
            min={0}
            max={1000000}
            step={50000}
            className={s.select}
          />
          {/* компонент для поиска продюссера */}
          <DesktopSelect
            values={genres.map(genre => ({ ru: genre.title.ru, en: genre.title.en }))}
            selectedValue={selectedGenre}
            setSelectedValue={(value: IText) => dispatch(setSelectedCountry(value))}
            className={s.select}
          />
          {/* компонент для поиска актера */}
          <DesktopSelect
            values={genres.map(genre => ({ ru: genre.title.ru, en: genre.title.en }))}
            selectedValue={selectedGenre}
            setSelectedValue={(value: IText) => dispatch(setSelectedCountry(value))}
            className={s.select}
          />
        </div>
        {
          (selectedGenre.en !== "All" || selectedCountry.en !== "All" || minRating !== 0
            || minCountOfRating !== 0 || selectedProducer !== "" || selectedActor !== "" || sortBy.en !== "All") &&
          <TextButton
            fs="14px"
            onClick={() => dispatch(clearFilters())}
            className={s.textButton}
          >
            Сбросить фильтры
          </TextButton>
        }
      </div>
      <div className={s.sort}>
        <DesktopSelect
          img={sort}
          values={sortByValues.map(value => ({ ru: value.ru, en: value.en }))}
          selectedValue={sortBy}
          setSelectedValue={(value: IText) => dispatch(setSortBy(value))}
          className={s.select}
        />
      </div>
    </div>
  )
};

export default DesktopFilters;
