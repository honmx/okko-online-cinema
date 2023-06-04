import React, { useEffect, useRef, useState } from "react";
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
import entitiesService from "@/services/entitiesService";
import Card from "@/components/UI/Card/Card";
import $commentsAPI from "@/http/comments";
import { useAppSelector } from "@/store/hooks";

interface Props {
  movie: IMovie;
  recommendations: IMovie[];
}

const Movie: NextPageWithLayout<Props> = ({ movie, recommendations }) => {

  const isActive = useDelay(4000);

  const user = useAppSelector(state => state.auth.user);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [activeSound, setActiveSound] = useState<boolean>(true);
  // const [comments, setComments] = useState<any>([]);

  const ref = useRef<HTMLVideoElement>(null);

  // useEffect(() => {
  //   const getComments = async () => {
  //     const { data: comments } = await $commentsAPI.get("/comment");
  //     setComments(comments);
  //   }

  //   getComments();

  //   const makeComments = async () => {
  //     const comment = await $commentsAPI.post("/comment", {
  //       userId: 2,
  //       comment: "dfgdfgdf",
  //       reviewId: 1
  //     });
  //   }

  //   makeComments()
  // }, []);

  // useEffect(() => {
  //   console.log(comments);
  // }, [comments]);

  const handleTabIndexChange = (value: number) => {
    setTabIndex(value);
  }

  const handleSoundClick = () => {
    setActiveSound(prev => !prev);
  }

  const handleFullScreenClick = () => {
    ref.current?.requestFullscreen();
  }

  const handleVolumeChange = () => {
    if (!ref.current) return;

    setActiveSound(ref.current.muted);
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
                      ref={ref}
                      src="/trailer.mp4"
                      autoPlay
                      width="100%"
                      height="100%"
                      muted={activeSound}
                      className={`${s.video} ${isActive ? s.activeVideo : ""}`}
                      onVolumeChange={handleVolumeChange}
                    />
                    <div className={s.movieButtonsContainer}>
                      <Button shape="circle" p="10px" img={!activeSound ? sound : soundDisabled} onClick={handleSoundClick} />
                      <Button shape="circle" p="10px" img={fullScreen} onClick={handleFullScreenClick} />
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
        <Carousel title="Похожие" className={s.recommendations}>
          {
            recommendations.map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} />)
          }
        </Carousel>
      </div>
    </>
  )
};

export default Movie;

interface Params extends ParsedUrlQuery {
  title: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {

  const movies = await entitiesService.getMovies();

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

  const title = context.params?.title as string;
  const movie = await entitiesService.getMovieByTitle(title);
  const recommendations = await entitiesService.getRecommendedMovies(movie);

  return {
    props: {
      movie,
      recommendations: recommendations.filter(recMovie =>
        recMovie.title !== movie.title
        && recMovie.horizontalPhoto),
    }
  }
}