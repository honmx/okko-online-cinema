import React, { FC, useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useTranslation } from 'next-i18next';
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import TextButton from "@/components/UI/TextButton/TextButton";
import AutoSuggestSelect from "@/components/UI/AutoSuggestSelect/AutoSuggestSelect";
import AutoSuggestModal from "@/components/AutoSuggestModal/AutoSuggestModal";
import IconButton from "@/components/UI/IconButton/IconButton";
import Title from "@/components/UI/Title/Title";
import Button from "@/components/UI/Button/Button";
import Select from "../UI/Select";
import Range from "../UI/Range";
import { useAppDispatch } from "@/store/hooks";
import { clearFilters, setSelectedMinCountOfRating, setSelectedMinRating, setSelectedCountry, setSelectedGenre, setSelectedSortBy, setSelectedProducer, setSelectedActor } from "@/store/slices/moviesFilterSlice";
import { areFiltersClear } from "@/helpers/areFiltersClear";
import { useScrollStart } from "@/hooks/useScrollStart";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import { IGenre } from "@/types/IGenre";
import parameters from "@/assets/parameters.svg";
import sort from "@/assets/sort.svg";
import close from "@/assets/close.svg";
import s from "./Filters.module.scss";

interface Props {
  showProducerFilter?: boolean;
  showActorFilter?: boolean;
  genres: IGenre[];
  countries: string[];
}

const Filters: FC<Props> = ({ genres, countries, showProducerFilter = true, showActorFilter = true }) => {

  const { t } = useTranslation("moviesPage");
  
  const dispatch = useAppDispatch();

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

  const handleParametersClick = () => setActiveParameters(prev => !prev);

  const handleProducerFilterClick = () => setIsProducerModalActive(prev => !prev);
  const handleActorFilterClick = () => setIsActorModalActive(prev => !prev);

  const handleSelectGenreClick = (value: string) => dispatch(setSelectedGenre(value));
  const handleSelectCountryClick = (value: string) => dispatch(setSelectedCountry(value));
  const handleSelectMinRatingClick = (value: number) => dispatch(setSelectedMinRating(value));
  const handleSelectMinCountOfRatingClick = (value: number) => dispatch(setSelectedMinCountOfRating(value));

  const handleProducerClick = (value: string) => {
    dispatch(setSelectedProducer(value));
    setIsProducerModalActive(prev => !prev);
  }

  const handleActorClick = (value: string) => {
    dispatch(setSelectedActor(value));
    setIsActorModalActive(prev => !prev);
  }

  const handleSelectSortByClick = (value: string) => dispatch(setSelectedSortBy(value));

  const handleResetFiltersClick = () => dispatch(clearFilters());

  const sortByValues = [
    t("sortByCountOfRating"),
    t("sortByRating"),
    t("sortByDate"),
    t("sortByAlphabet"),
  ]

  return (
    <div className={s.filtersWrapper}>
      {
        (isSmaller && activeParameters || !isSmaller) && <>
          <div className={`${s.filtersContainer} ${activeParameters && s.mobileFilters}`}>
            {
              activeParameters &&
              <div className={s.header}>
                <Title className={s.title}>{t("moviesPage:filters")}</Title>
                {
                  !areFiltersClear({
                    selectedGenre, selectedCountry, selectedMinRating,
                    selectedMinCountOfRating, selectedProducer, selectedActor, selectedSortBy
                  }) &&
                  <TextButton fs="14px" onClick={handleResetFiltersClick} className={s.textButton}>{t("moviesPage:reset")}</TextButton>
                }
                <Button shape="circle" img={close} p="10px" className={s.closeButton} onClick={handleParametersClick} />
              </div>
            }
            <div className={s.filtersWithTextButton}>
              <div className={s.filters}>
                <Select title={t("moviesPage:genresTitle")} values={genres} selectedValue={selectedGenre} setSelectedValue={handleSelectGenreClick} className={s.select} />
                <Select title={t("moviesPage:countriesTitle")} values={countries} selectedValue={selectedCountry} setSelectedValue={handleSelectCountryClick} className={s.select} />
                <Range title={t("moviesPage:minRatingTitle")} value={selectedMinRating} setValue={handleSelectMinRatingClick} min={0} max={10} step={0.1} className={s.select} />
                <Range title={t("moviesPage:minCountOfRatingTitle")} value={selectedMinCountOfRating} setValue={handleSelectMinCountOfRatingClick} min={0} max={1000000} step={50000} className={s.select} />
                {
                  showProducerFilter &&
                  <AutoSuggestSelect
                    value={selectedProducer}
                    placeholder={t("moviesPage:producer")}
                    onClick={handleProducerFilterClick}
                    className={s.select}
                  />
                }
                {
                  showActorFilter &&
                  <AutoSuggestSelect
                    value={selectedActor}
                    placeholder={t("moviesPage:actor")}
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
                  {t("moviesPage:reset")}
                </TextButton>
              }
            </div>
            <div className={s.sort}>
              <Select values={sortByValues} selectedValue={selectedSortBy} setSelectedValue={handleSelectSortByClick} title="Сортировка" img={sort} className={s.select} />
            </div>
            {
              activeParameters &&
              <Button bgColor="accent" className={s.applyButton} onClick={handleParametersClick}>{t("moviesPage:apply")}</Button>
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

export default Filters;