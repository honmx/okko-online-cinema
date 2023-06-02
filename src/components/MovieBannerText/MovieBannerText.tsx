import React, { FC, useState } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import { IMovie } from "@/types/IMovie";
import axios from "axios";
import Image from "next/image";
import Title from "@/components/UI/Title/Title";
import { getFirstSentence } from "@/helpers/getFirstSentence";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import PeopleList from "@/components/PeopleList/PeopleList";
import Button from "@/components/UI/Button/Button";
import favourites from "@/assets/favourites.svg";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import star from "@/assets/star.svg";
import soundtrack from "@/assets/soundtrack.svg";
import Tabs from "@/components/UI/Tabs/Tabs";
import Rate from "@/components/Rate/Rate";
import Carousel from "@/components/UI/Carousel/Carousel";
import SubscribeCard from "@/components/SubscribeCard/SubscribeCard";
import { subscribtions } from "@/helpers/data/subscribtions";
import s from "./MovieBannerText.module.scss";
import { capitalize } from "@/helpers/capitalize";
import IconButton from "../UI/IconButton/IconButton";
import Modal from "../UI/Modal/Modal";
import PersonCard from "../PersonCard/PersonCard";
import MoviePeopleModal from "../MoviePeopleModal/MoviePeopleModal";

interface Props {
  movie: IMovie;
  className?: string;
}

const MovieBannerText: FC<Props> = ({ movie, className }) => {

  // if (!movie.people) return null;

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
        <Title variant="h2" fs={isSmaller ? "30px" : "60px"} className={s.title}>{movie.title}</Title>
        <div className={s.commonInfoContainer}>
          <div className={s.ratingContainer}>
            <p className={`${s.rating} ${movie.rate > 7 ? s.greenRate : s.usualRate}`}>{movie.rate}</p>
          </div>
          <p className={s.year}>{movie.yearTill}</p>
          <p className={s.genre}>{capitalize(movie.genres[0].title)}</p>
          <p className={s.minAge}>{movie.ageRate}+</p>
        </div>
        <p className={s.description}>{getFirstSentence(movie.description)}</p>
        <PeopleList people={producers.slice(0, 1)} title="Режиссёр" pluralTitle="Режиссёры" className={`${s.producers} ${s.peopleList}`} />
        <PeopleList people={actors.slice(0, 3)} title="Актёр" pluralTitle="Актёры" className={`${s.actors} ${s.peopleList}`} />
        <IconButton onClick={handleMoreClick} className={s.moreBtn}>
          <p>{showMore ? "Скрыть" : "Ещё"}</p>
        </IconButton>
        <div className={s.titleContainer}>
          <Title color="gold" fs={isSmaller ? "16px" : "26px"}>Месяц за 1 ₽, затем месяц за 199 ₽</Title>
          <Title fw={400} fs={isSmaller ? "12px" : "20px"}>дальше — 399 ₽⁠/⁠месяц в подписке Оптимум</Title>
        </div>
        <div className={s.buttonsContainer}>
          <Button bgColor="accent" value="Оформить подписку" p="15px 10px" className={s.subscriptionButton} />
          {
            isSmaller
              ? <Button img={soundtrack} p="15px" className={s.trailerButton} />
              : <Button value="Трейлер" p="15px 10px" className={s.trailerButton} />
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
