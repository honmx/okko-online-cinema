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
import AutoSuggestSelectDesktop from "@/components/UI/AutoSuggestSelect/AutoSuggestSelect";
import AutoSuggestModal from "@/components/AutoSuggestModal/AutoSuggestModal";
import { areFiltersClear } from "@/helpers/areFiltersClear";
import { IPerson } from "@/types/IPerson";
import { useScrollStart } from "@/hooks/useScrollStart";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import IconButton from "@/components/UI/IconButton/IconButton";
import Image from "next/image";
import parameters from "@/assets/parameters.svg";
import Title from "@/components/UI/Title/Title";
import Button from "@/components/UI/Button/Button";
import close from "../../../assets/close.svg";
import MobileSelect from "@/components/UI/Select/MobileSelect/MobileSelect";
import MobileRange from "@/components/UI/Range/MobileRange/MobileRange";

interface Props extends CommonProps {

}

const DesktopFilters: FC<Props> = ({ genres, countries, showProducerFilter = true, showActorFilter = true }) => {

  const dispatch = useAppDispatch();
  const router = useRouter();

  const isSmaller = useSmallerDevice(959);

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

  useScrollStart(isProducerModalActive || isActorModalActive || activeParameters);

  useEffect(() => {
    if (activeParameters) {
      setActiveParameters(false);
    }
  }, [isSmaller]);

  const handleParametersClick = () => {
    setActiveParameters(prev => !prev);
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

  const handleResetFiltersClick = () => {
    dispatch(clearFilters());
  }

  return (
    <div className={s.filtersWrapper}>
      {
        (isSmaller && activeParameters || !isSmaller) && <>
          <div className={`${s.filtersContainer} ${activeParameters && s.mobileFilters}`}>
            {
              activeParameters &&
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
            }
            <div className={s.filtersWithTextButton}>
              <div className={s.filters}>
                {
                  isSmaller
                    ? <MobileSelect
                      title="Жанры"
                      values={genres}
                      selectedValue={selectedGenre}
                      setSelectedValue={(value: string) => dispatch(setSelectedGenre(value))}
                      className={s.select}
                    />
                    : <DesktopSelect
                      values={genres}
                      selectedValue={selectedGenre}
                      setSelectedValue={(value: string) => dispatch(setSelectedGenre(value))}
                      className={s.select}
                    />
                }
                {
                  isSmaller
                    ? <MobileSelect
                      title="Страны"
                      values={countries}
                      selectedValue={selectedCountry}
                      setSelectedValue={(value: string) => dispatch(setSelectedCountry(value))}
                      className={s.select}
                    />
                    : <DesktopSelect
                      values={countries}
                      selectedValue={selectedCountry}
                      setSelectedValue={(value: string) => dispatch(setSelectedCountry(value))}
                      className={s.select}
                    />
                }
                {
                  isSmaller
                    ? <MobileRange
                      title="Рейтинг"
                      value={selectedMinRating}
                      setValue={(value: number) => dispatch(setSelectedMinRating(value))}
                      min={0}
                      max={10}
                      step={0.1}
                      className={s.select}
                    />
                    : <DesktopRange
                      title="Рейтинг"
                      value={selectedMinRating}
                      setValue={(value: number) => dispatch(setSelectedMinRating(value))}
                      min={0}
                      max={10}
                      step={0.1}
                      className={s.select}
                    />
                }
                {
                  isSmaller
                    ? <MobileRange
                      title="Кол-во оценок"
                      value={selectedMinCountOfRating}
                      setValue={(value: number) => dispatch(setSelectedMinCountOfRating(value))}
                      min={0}
                      max={1000000}
                      step={50000}
                      className={s.select}
                    />
                    : <DesktopRange
                      title="Кол-во оценок"
                      value={selectedMinCountOfRating}
                      setValue={(value: number) => dispatch(setSelectedMinCountOfRating(value))}
                      min={0}
                      max={1000000}
                      step={50000}
                      className={s.select}
                    />
                }
                {
                  showProducerFilter &&
                  <AutoSuggestSelectDesktop
                    value={selectedProducer}
                    placeholder="Режиссёр"
                    onClick={handleProducerFilterClick}
                    className={s.select}
                  />
                }
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
                })) && !activeParameters &&
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
              {
                isSmaller
                  ? <MobileSelect
                    title="Сортировка"
                    values={sortByValues}
                    selectedValue={selectedSortBy}
                    setSelectedValue={(value: string) => dispatch(setSelectedSortBy(value))}
                    className={s.select}
                  />
                  : <DesktopSelect
                    img={sort}
                    values={sortByValues}
                    selectedValue={selectedSortBy}
                    setSelectedValue={(value: string) => dispatch(setSelectedSortBy(value))}
                    className={s.select}
                  />
              }
            </div>
            {
              activeParameters &&
              <Button value="Применить фильтры" bgColor="accent" className={s.applyButton} onClick={handleParametersClick} />
            }
          </div>
        </>
      }
      {
        isProducerModalActive &&
        <AutoSuggestModal entitiyType="Режиссёр" onEntityClick={handleProducerClick} onClose={handleProducerFilterClick} />
      }
      {
        isActorModalActive &&
        <AutoSuggestModal entitiyType="Актёр" onEntityClick={handleActorClick} onClose={handleActorFilterClick} />
      }
      {
        isSmaller && !activeParameters &&
        <div className={s.parameters}>
          <IconButton onClick={handleParametersClick}>
            <Image src={parameters} alt="parameters" />
          </IconButton>
        </div>
      }
    </div>
  )
};

export default DesktopFilters;
