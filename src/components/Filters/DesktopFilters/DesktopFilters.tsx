import React, { FC, useEffect, useState } from "react";
import DesktopSelect, { SelectOptionType } from "@/components/UI/Select/DesktopSelect/DesktopSelect";
import { genres } from "@/helpers/data/genres";
import DesktopRange from "@/components/UI/Range/DesktopRange/DesktopRange";
import { sortByValues } from "@/helpers/data/sortByValues";
import sort from "@/assets/sort.svg";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { IText } from "@/types/IText";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters, setSelectedMinCountOfRating, setSelectedMinRating, setSelectedCountry, setSelectedGenre, setSelectedSortBy, setSelectedProducer, setSelectedActor } from "@/store/slices/moviesFilterSlice";
import TextButton from "@/components/UI/TextButton/TextButton";
import { useRouter } from "next/router";
import CommonProps from "../IProps";
import s from "./DesktopFilters.module.scss";
import AutoSuggestSelectDesktop from "@/components/UI/AutoSuggestSelect/AutoSuggestSelectDesktop/AutoSuggestSelectDesktop";
import AutoSuggestModal from "@/components/AutoSuggestModal/AutoSuggestModal";
import { areFiltersClear } from "@/helpers/areFiltersClear";
import { IPerson } from "@/types/IPerson";
import { useScrollStart } from "@/hooks/useScrollStart";

interface Props extends CommonProps {

}

const DesktopFilters: FC<Props> = ({ genres, countries, showProducerFilter = true, showActorFilter = true }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const {
    selectedGenre,
    selectedCountry,
    selectedMinRating,
    selectedMinCountOfRating,
    selectedProducer,
    selectedActor,
    selectedSortBy,
  } = useSelectedFilters();

  const [isProducerModalActive, setIsProducerModalActive] = useState<boolean>(false);
  const [isActorModalActive, setIsActorModalActive] = useState<boolean>(false);

  useScrollStart(isProducerModalActive || isActorModalActive);

  const handleProducerFilterClick = () => {
    setIsProducerModalActive(prev => !prev);
  }
  
  const handleActorFilterClick = () => {
    setIsActorModalActive(prev => !prev);
  }
  
  const handleProducerClick = (value: string) => {
    dispatch(setSelectedProducer(value));
    setIsProducerModalActive(prev => !prev);
  }
  
  const handleActorClick = (value: string) => {
    dispatch(setSelectedActor(value));
    setIsActorModalActive(prev => !prev);
  }

  return (
    <div className={s.filtersWrapper}>
      {/* вынести */}
      <div className={s.filtersContainer}>
        <div className={s.filters}>
          {/* genres */}
          <DesktopSelect
            values={genres}
            selectedValue={selectedGenre}
            setSelectedValue={(value: string) => dispatch(setSelectedGenre(value))}
            className={s.select}
          />
          {/* countries */}
          <DesktopSelect
            values={countries}
            selectedValue={selectedCountry}
            setSelectedValue={(value: string) => dispatch(setSelectedCountry(value))}
            className={s.select}
          />
          {/* minRating */}
          <DesktopRange
            title="Рейтинг"
            value={selectedMinRating}
            setValue={(value: number) => dispatch(setSelectedMinRating(value))}
            min={0}
            max={10}
            step={0.1}
            className={s.select}
          />
          {/* minCountOfRating */}
          <DesktopRange
            title="Кол-во оценок"
            value={selectedMinCountOfRating}
            setValue={(value: number) => dispatch(setSelectedMinCountOfRating(value))}
            min={0}
            max={1000000}
            step={50000}
            className={s.select}
          />
          {/* компонент для поиска продюссера */}
          {
            showProducerFilter &&
            <AutoSuggestSelectDesktop
              value={selectedProducer}
              placeholder="Режиссёр"
              onClick={handleProducerFilterClick}
              className={s.select}
            />
          }
          {/* компонент для поиска актера */}
          {
            showActorFilter &&
            <AutoSuggestSelectDesktop
              value={selectedActor}
              placeholder="Актёр"
              onClick={handleActorFilterClick}
              className={s.select}
            />
          }
        </div>
        {
          (!areFiltersClear({
            selectedGenre,
            selectedCountry,
            selectedMinRating,
            selectedMinCountOfRating,
            selectedProducer,
            selectedActor,
            selectedSortBy
          })) &&
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
          values={sortByValues}
          selectedValue={selectedSortBy}
          setSelectedValue={(value: string) => dispatch(setSelectedSortBy(value))}
          className={s.select}
        />
      </div>
      {
        isProducerModalActive &&
        <AutoSuggestModal entitiyType="Режиссёр" onEntityClick={handleProducerClick} onClose={handleProducerFilterClick} />
      }
      {
        isActorModalActive &&
        <AutoSuggestModal entitiyType="Актёр" onEntityClick={handleActorClick} onClose={handleActorFilterClick} />
      }
    </div>
  )
};

export default DesktopFilters;
