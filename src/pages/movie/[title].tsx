import React, { useState } from "react";
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
import s from "./Movie.module.scss";
import Tabs from "@/components/UI/Tabs/Tabs";
import Rate from "@/components/Rate/Rate";
import Carousel from "@/components/UI/Carousel/Carousel";
import SubscribeCard from "@/components/SubscribeCard/SubscribeCard";
import { subscribtions } from "@/helpers/data/subscribtions";
import MovieBannerText from "@/components/MovieBannerText/MovieBannerText";
import Head from "next/head";

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
    <>
      <Head>
        <title>{movie.title}</title>
        <meta
          name="description"
          content={movie.description}
        />
      </Head>
      <div className={s.moviePageContainer}>
        <div className={s.movieBanner}>
          <div className={s.background}>
            <Image src={"https:" + movie.photo} alt="img" priority width={1920} height={1080} />
          </div>
          <MovieBannerText movie={movie} className={s.textContainer} />
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
                      key={subscription.title}
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
    </>
  )
};

export default Movie;

interface Params extends ParsedUrlQuery {
  title: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {

  const { data: movies } = await axios.get<IMovie[]>("/movie");

  return {
    paths: movies.map(movie => ({
      params: {
        title: movie.title
      }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (context) => {

  const title = context.params?.title;
  const { data: movie } = await axios.get<IMovie>(`/movie/title/${title}`);

  return {
    props: {
      movie
    }
  }
}