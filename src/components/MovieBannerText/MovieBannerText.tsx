import React, { FC, useState } from "react";
import { useTranslation } from "next-i18next";
import Title from "@/components/UI/Title/Title";
import PeopleList from "@/components/PeopleList/PeopleList";
import Button from "@/components/UI/Button/Button";
import IconButton from "../UI/IconButton/IconButton";
import MoviePeopleModal from "../MoviePeopleModal/MoviePeopleModal";
import { IMovie } from "@/types/IMovie";
import { getFirstSentence } from "@/helpers/getFirstSentence";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import { capitalize } from "@/helpers/capitalize";
import favourites from "@/assets/favourites.svg";
import star from "@/assets/star.svg";
import soundtrack from "@/assets/soundtrack.svg";
import s from "./MovieBannerText.module.scss";

interface Props {
  movie: IMovie;
  className?: string;
}

const MovieBannerText: FC<Props> = ({ movie, className }) => {

  const { t, i18n } = useTranslation("moviePage");
  const lang = i18n.language;

  const producers = movie.people.filter(person => person.profession === "Режиссёр");
  const actors = movie.people.filter(person => person.profession === "Актёр");

  const isSmaller = useSmallerDevice(599);

  const [acitveRate, setActiveRate] = useState<boolean>(false);
  const [showMore, setShowMore] = useState<boolean>(false);

  const handleRateClick = () => {
    setActiveRate(prev => !prev);
  }

  const handleMoreClick = () => {
    setShowMore(prev => !prev);
  }

  return (
    <>
      <div className={`${s.textContainer} ${className}`}>
        <Title variant="h2" fs={isSmaller ? "30px" : "50px"} className={s.title}>{lang === "en" && movie.originalTitle ? movie.originalTitle : movie.title}</Title>
        <div className={s.commonInfoContainer}>
          <div className={s.ratingContainer}>
            <p className={`${s.rating} ${movie.rate > 7 ? s.greenRate : s.usualRate}`}>{movie.rate}</p>
          </div>
          <p className={s.year}>{movie.yearSince} {movie.yearTill && movie.yearTill !== movie.yearSince && ` - ${movie.yearTill}`}</p>
          <p className={s.genre}>{capitalize(movie.genres[0].originalTitle ? movie.genres[0].originalTitle : movie.genres[0].title)}</p>
          <p className={s.minAge}>{movie.ageRate}+</p>
        </div>
        <p className={s.description}>{getFirstSentence(movie.description)}</p>
        <PeopleList people={producers.slice(0, 1)} title={t("moviePage:people.producer")} pluralTitle={t("moviePage:people.producers")} className={`${s.producers} ${s.peopleList}`} />
        <PeopleList people={actors.slice(0, 3)} title={t("moviePage:people.actor")} pluralTitle={t("moviePage:people.actors")} className={`${s.actors} ${s.peopleList}`} />
        <IconButton onClick={handleMoreClick} className={s.moreBtn}>
          <p>{showMore ? t("moviePage:hide") : t("moviePage:showMore")}</p>
        </IconButton>
        <div className={s.titleContainer}>
          <Title color="gold" fs={isSmaller ? "16px" : "26px"}>{t("moviePage:subscriptions.optimum.accentText")}</Title>
          <Title fw={400} fs={isSmaller ? "12px" : "20px"}>{t("moviePage:subscriptions.optimum.usualText")}</Title>
        </div>
        <div className={s.buttonsContainer}>
          <Button bgColor="accent" p="15px 10px" className={s.subscriptionButton}>{t("moviePage:subscribe")}</Button>
          {
            isSmaller
              ? <Button img={soundtrack} p="15px" className={s.trailerButton} />
              : <Button p="15px 10px" className={s.trailerButton}>{t("moviePage:trailer")}</Button>
          }
          <Button img={favourites} p="15px" className={s.favouritesButton} />
          {
            isSmaller &&
            <Button img={star} p="15px" onClick={handleRateClick} />
          }
        </div>
      </div>
      {
        showMore &&
        <MoviePeopleModal producers={producers} actors={actors} onClose={handleMoreClick} />
      }
    </>
  )
};

export default MovieBannerText;
