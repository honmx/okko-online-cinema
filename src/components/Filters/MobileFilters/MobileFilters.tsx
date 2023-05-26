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
import { clearFilters, setSelectedMinCountOfRating, setSelectedMinRating, setSelectedCountry, setSelectedGenre, setSelectedSortBy, setSelectedProducer, setSelectedActor } from "@/store/slices/moviesFilterSlice";
import Link from "next/link";
import TextButton from "@/components/UI/TextButton/TextButton";
import { useRouter } from "next/router";
import { areFiltersClear } from "@/helpers/areFiltersClear";
import CommonProps from "../IProps";
import AutoSuggestSelectDesktop from "@/components/UI/AutoSuggestSelect/AutoSuggestSelectDesktop/AutoSuggestSelectDesktop";
import AutoSuggestModal from "@/components/UI/AutoSuggestModal/AutoSuggestModal";

interface Props extends CommonProps {

}

const MobileFilters: FC<Props> = ({ showProducerFilter = true, showActorFilter = true }) => {

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

  const [activeParameters, setActiveParameters] = useState<boolean>(false);
  const [isProducerModalActive, setIsProducerModalActive] = useState<boolean>(false);
  const [isActorModalActive, setIsActorModalActive] = useState<boolean>(false);

  useScrollStart(activeParameters);

  const handleParametersClick = () => {
    setActiveParameters(prev => !prev);
  }

  const handleResetFiltersClick = () => {
    dispatch(clearFilters());
  }

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
    <>
      {
        activeParameters &&
        <div className={s.filtersContainer}>
          <div className={s.header}>
            <Title className={s.title}>Фильтры</Title>
            {
              !areFiltersClear({
                selectedGenre, selectedCountry, selectedMinRating,
                selectedMinCountOfRating, selectedProducer, selectedActor, selectedSortBy
              }) &&
              <TextButton fs="14px" onClick={handleResetFiltersClick} className={s.textButton}>Сбросить фильтры</TextButton>
            }
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
              value={selectedMinRating}
              setValue={(value: number) => dispatch(setSelectedMinRating(value))}
              min={0}
              max={10}
              step={0.1}
              className={s.select}
            />
            <MobileRange
              title="Кол-во оценок"
              value={selectedMinCountOfRating}
              setValue={(value: number) => dispatch(setSelectedMinCountOfRating(value))}
              min={0}
              max={1000000}
              step={50000}
              className={s.select}
            />
            {/* поиск режиссеров */}
            {
              showProducerFilter &&
              <AutoSuggestSelectDesktop
                value={selectedProducer}
                placeholder="Режиссёр"
                onClick={handleProducerFilterClick}
                className={s.select}
              />
            }
            {/* поиск актеров */}
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
      {
        isProducerModalActive &&
        <AutoSuggestModal entitiyType="Режиссёр" onEntityClick={handleProducerClick} onClose={handleProducerFilterClick} />
      }
      {
        isActorModalActive &&
        <AutoSuggestModal entitiyType="Актёр" onEntityClick={handleActorClick} onClose={handleActorFilterClick} />
      }
    </>
  )
};

export default MobileFilters;
