import React, { useState } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps } from "next";
import { IMovie } from "@/types/IMovie";
import axios from "axios";
import Tabs from "@/components/UI/Tabs/Tabs";
import Rate from "@/components/Rate/Rate";
import Carousel from "@/components/UI/Carousel/Carousel";
import SubscribeCard from "@/components/SubscribeCard/SubscribeCard";
import { subscribtions } from "@/helpers/data/subscribtions";
import MovieBannerText from "@/components/MovieBannerText/MovieBannerText";
import Head from "next/head";
import Image from "next/image";
import trailer from "../../assets/trailer.mp4";
import ReactPlayer from "react-player";
import s from "./Movie.module.scss";
import { useDelay } from "@/hooks/useDelay";

interface Props {
  movie: IMovie;
}

const Movie: NextPageWithLayout<Props> = ({ movie }) => {

  const isActive = useDelay(4000);

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
            <iframe
              width={isActive ? "100%" : "0%"}
              height={isActive ? "100%" : "0%"}
              src="https://www.youtube.com/embed/tTwFeGArcrs?autoplay=1&mute=1"
              title="YouTube video player"
              allow="autoplay; encrypted-media"
              allowFullScreen
              className={s.video}
            ></iframe>
            {
              !isActive &&
              <Image src={"https:" + movie.photo} alt="img" priority width={1920} height={1080} />
            }
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