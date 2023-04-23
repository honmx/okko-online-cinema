import React, { FC, useState } from "react";
import DesktopSelect, { SelectOptionType } from "@/components/UI/Select/DesktopSelect/DesktopSelect";
import { genres } from "@/helpers/data/genres";
import DesktopRange from "@/components/UI/Range/DesktopRange/DesktopRange";
import { sortByValues } from "@/helpers/data/sortByValues";
import sort from "@/assets/sort.svg";
import s from "./DesktopFilters.module.scss";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { IText } from "@/types/IText";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters, setMinRating, setSelectedGenre, setSortBy } from "@/store/slices/moviesFilterSlice";
import TextButton from "@/components/UI/TextButton/TextButton";

interface Props {

}

const DesktopFilters: FC<Props> = ({ }) => {

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

  return (
    <div className={s.filtersContainer}>
      {/* вынести */}
      <div className={s.filters}>
        <DesktopSelect
          values={genres.map(genre => ({ ru: genre.title.ru, en: genre.title.en }))}
          selectedValue={genre}
          setSelectedValue={(value: IText) => dispatch(setSelectedGenre(value))}
          className={s.select}
        />
        <DesktopRange
          value={minRating}
          setValue={(value: number) => dispatch(setMinRating(value))}
          min={0}
          max={10}
          step={0.1}
          className={s.select}
        />
        {
          (genre.en !== "All" || country.en !== "All" || minRating !== 0
            || minCountOfRating !== 0 || producer !== "" || actor !== "" || sortBy.en !== "All") &&
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
