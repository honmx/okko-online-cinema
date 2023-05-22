import React, { useEffect, useState } from "react";
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
import { useDelay } from "@/hooks/useDelay";
import ReactPlayer from "react-player";
import Button from "@/components/UI/Button/Button";
import sound from "@/assets/sound.svg";
import soundDisabled from "@/assets/soundDisabled.svg";
import fullScreen from "@/assets/fullScreen.svg";
import s from "./Movie.module.scss";

interface Props {
  movie: IMovie;
}

const Movie: NextPageWithLayout<Props> = ({ movie }) => {

  const isActive = useDelay(4000);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [activeSound, setActiveSound] = useState<boolean>(true);

  const handleTabIndexChange = (value: number) => {
    setTabIndex(value);
  }

  const handleSoundClick = () => {
    setActiveSound(prev => !prev);
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
            {
              isActive
                ? (
                  <>
                    <video
                      src="/trailer.mp4"
                      autoPlay
                      width="100%"
                      height="100%"
                      muted={activeSound}
                      controls
                      loop
                      
                      className={`${s.video} ${isActive ? s.activeVideo : ""}`}
                    />
                    <div className={s.movieButtonsContainer}>
                      <Button shape="circle" p="10px" img={!activeSound ? sound : soundDisabled} onClick={handleSoundClick} />
                      <Button shape="circle" p="10px" img={fullScreen} />
                    </div>
                  </>
                ) : (
                  <Image src={movie.horizontalPhoto} alt="img" priority width={1920} height={1080} />
                )
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