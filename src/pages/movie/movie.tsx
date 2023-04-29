import React, { useState } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import { ParsedUrlQuery } from "querystring";
import { GetStaticProps } from "next";
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
import s from "./Movie.module.scss";
import Tabs from "@/components/UI/Tabs/Tabs";
import Rate from "@/components/Rate/Rate";
import Carousel from "@/components/UI/Carousel/Carousel";
import SubscribeCard from "@/components/SubscribeCard/SubscribeCard";
import { subscribtions } from "@/helpers/data/subscribtions";

interface Props {
  movie: IMovie;
}

const Movie: NextPageWithLayout<Props> = ({ movie }) => {

  const producers = movie.people.filter(person => person.profession === "Режиссёр");
  const actors = movie.people.filter(person => person.profession === "Актёр").slice(0, 3);

  const isSmaller = useSmallerDevice(599);

  const [tabIndex, setTabIndex] = useState<number>(0);

  const handleTabIndexChange = (value: number) => {
    setTabIndex(value);
  }

  return (
    <div className={s.moviePageContainer}>
      <div className={s.movieBanner}>
        <div className={s.background}>
          <Image src={movie.images[0].image} alt="img" width={1920} height={1080} />
        </div>
        {/* выделить компонент */}
        <div className={s.textContainer}>
          <Title variant="h2" fs={isSmaller ? "45px" : "60px"} className={s.title}>{movie.title}</Title>
          <div className={s.commonInfoContainer}>
            <div className={s.ratingContainer}>
              <p className={`${s.rating} ${movie.rate > 7 ? s.greenRate : s.usualRate}`}>{movie.rate}</p>
            </div>
            <p className={s.year}>{movie.yearTill}</p>
            <p className={s.genre}>{movie.genres[0].genre}</p>
            {/* <p className={s.time}></p> */}
            {/* <p className={s.audio}></p> */}
            <p className={s.minAge}>{movie.ageRate}+</p>
          </div>
          <p className={s.description}>{getFirstSentence(movie.description)}</p>
          <PeopleList people={producers} title="Режиссёр" pluralTitle="Режиссёры" className={`${s.producers} ${s.peopleList}`} />
          <PeopleList people={actors} title="Актёр" pluralTitle="Актёры" className={`${s.actors} ${s.peopleList}`} />
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
              <Button img={star} p="15px" />
            }
          </div>
        </div>
      </div>
      <div className={s.tabsContainer}>
        <Tabs tabs={["Описание", "Варианты просмотра"]} tabIndex={tabIndex} onChange={handleTabIndexChange}>
          <div className={s.fullDescriptionContainer}>
            <p className={s.fullDescription}>{movie.description}</p>
            <Rate />
          </div>
          <div className={s.subcriptions}>
            <Carousel>
              {
                subscribtions.map(subscription => (
                  <SubscribeCard
                    title={subscription.title}
                    subtitle={subscription.subtitle}
                    accentText={subscription.accentText}
                    usualText={subscription.usualText}
                    className={s.subscriptionCard}
                  />
                ))
              }
            </Carousel>
          </div>
        </Tabs>
      </div>
    </div>
  )
};

export default Movie;

interface Params extends ParsedUrlQuery {
  movie: string;
}

export const getStaticProps: GetStaticProps = async () => {

  const { data: movie } = await axios.get<IMovie>("/movie/12");
  const { data: persons } = await axios.get("/movie/12/people");

  return {
    props: {
      movie,
      persons
    }
  }
}