import React, { FC, useState } from "react";
import DesktopSelect, { SelectOptionType } from "@/components/UI/Select/DesktopSelect/DesktopSelect";
import { genres } from "@/helpers/data/genres";
import DesktopRange from "@/components/UI/Range/DesktopRange/DesktopRange";
import { sortByValues } from "@/helpers/data/sortByValues";
import sort from "@/assets/sort.svg";
import s from "./DesktopFilters.module.scss";

interface Props {

}

const DesktopFilters: FC<Props> = ({ }) => {

  const [genre, setGenre] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [genre1, setGenre1] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [genre2, setGenre2] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [sortBy, setSortBy] = useState<SelectOptionType>({ value: "All", text: "Все" });
  const [minRating, setMinRating] = useState<number>(0);

  return (
    <div className={s.filtersContainer}>
      {/* вынести */}
      <div className={s.filters}>
        <DesktopSelect
          values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
          selectedValue={genre}
          setSelectedValue={setGenre}
          className={s.select}
        />
        <DesktopSelect
          values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
          selectedValue={genre1}
          setSelectedValue={setGenre1}
          className={s.select}
        />
        <DesktopSelect
          values={genres.map(genre => ({ value: genre.value, text: genre.title }))}
          selectedValue={genre2}
          setSelectedValue={setGenre2}
          className={s.select}
        />
        <DesktopRange
          value={minRating}
          setValue={setMinRating}
          min={0}
          max={10}
          step={0.1}
          className={s.select}
        />
      </div>
      <div className={s.sort}>
        <DesktopSelect
          img={sort}
          values={sortByValues.map(value => ({ value: value.value, text: value.text }))}
          selectedValue={sortBy}
          setSelectedValue={setSortBy}
          className={s.select}
        />
      </div>
    </div>
  )
};

export default DesktopFilters;
