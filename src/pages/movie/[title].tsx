import React, { FormEvent, useEffect, useRef, useState } from "react";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import Head from "next/head";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Tabs from "@/components/UI/Tabs/Tabs";
import Rate from "@/components/Rate/Rate";
import Carousel from "@/components/UI/Carousel/Carousel";
import SubscribeCard from "@/components/SubscribeCard/SubscribeCard";
import MovieBannerText from "@/components/MovieBannerText/MovieBannerText";
import Button from "@/components/UI/Button/Button";
import Card from "@/components/UI/Card/Card";
import Title from "@/components/UI/Title/Title";
import CommentList from "@/components/CommentList/CommentList";
import TextArea from "@/components/UI/TextArea/TextArea";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import { IMovie } from "@/types/IMovie";
import { useDelay } from "@/hooks/useDelay";
import entitiesService from "@/services/entitiesService";
import $commentsAPI from "@/http/comments";
import { useAppSelector } from "@/store/hooks";
import { IComment } from "@/types/IComment";
import commentsService from "@/services/commentsService";
import sound from "@/assets/sound.svg";
import soundDisabled from "@/assets/soundDisabled.svg";
import fullScreen from "@/assets/fullScreen.svg";
import check from "@/assets/check.svg";
import s from "./Movie.module.scss";

interface Props {
  movie: IMovie;
  recommendations: IMovie[];
}

const Movie: NextPageWithLayout<Props> = ({ movie, recommendations }) => {

  const { t, i18n } = useTranslation("moviePage");
  const lang = i18n.language;

  const ref = useRef<HTMLVideoElement>(null);

  const isActive = useDelay(4000);

  const user = useAppSelector(state => state.auth.user);

  const [tabIndex, setTabIndex] = useState<number>(0);
  const [activeSound, setActiveSound] = useState<boolean>(true);
  const [comments, setComments] = useState<IComment[]>([]);
  const [value, setValue] = useState<string>("");

  useEffect(() => {
    const getComments = async () => {
      const { data: comments } = await $commentsAPI.get(`/movie-comment/movie/${movie.id}`);
      setComments(comments);
    }

    getComments();
  }, []);

  const handleTextAreaChange = (value: string) => {
    setValue(value);
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newComment = await commentsService.createComment(user.id, value, movie.id);
    setComments(prev => [...prev, newComment]);
    setValue("");
  }

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

  const subscribtions = [
    {
      title: t("moviePage:subscriptions.optimum.title"),
      subtitle: t("moviePage:subscriptions.optimum.subtitle"),
      accentText: t("moviePage:subscriptions.optimum.accentText"),
      usualText: t("moviePage:subscriptions.optimum.usualText")
    },
    {
      title: t("moviePage:subscriptions.optimumSport.title"),
      subtitle: t("moviePage:subscriptions.optimumSport.subtitle"),
      accentText: t("moviePage:subscriptions.optimumSport.accentText"),
      usualText: t("moviePage:subscriptions.optimumSport.usualText")
    },
    {
      title: t("moviePage:subscriptions.optimumSTART.title"),
      subtitle: t("moviePage:subscriptions.optimumSTART.subtitle"),
      accentText: t("moviePage:subscriptions.optimumSTART.accentText"),
      usualText: t("moviePage:subscriptions.optimumSTART.usualText")
    },
    {
      title: t("moviePage:subscriptions.optimumAMEDIATEKA.title"),
      subtitle: t("moviePage:subscriptions.optimumAMEDIATEKA.subtitle"),
      accentText: t("moviePage:subscriptions.optimumAMEDIATEKA.accentText"),
      usualText: t("moviePage:subscriptions.optimumAMEDIATEKA.usualText")
    },
    {
      title: t("moviePage:subscriptions.premium.title"),
      subtitle: t("moviePage:subscriptions.premium.subtitle"),
      accentText: t("moviePage:subscriptions.premium.accentText"),
      usualText: t("moviePage:subscriptions.premium.usualText")
    },
    {
      title: t("moviePage:subscriptions.lite.title"),
      subtitle: t("moviePage:subscriptions.lite.subtitle"),
      usualText: t("moviePage:subscriptions.lite.usualText")
    },
  ]

  return (
    <>
      <Head>
        <title>{lang === "en" && movie.originalTitle ? movie.originalTitle : movie.title}</title>
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
          <Tabs tabs={[t("moviePage:tabs.description"), t("moviePage:tabs.options")]} tabIndex={tabIndex} onChange={handleTabIndexChange}>
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
        <Carousel title={t("moviePage:similar") as string} className={s.recommendations}>
          {
            recommendations.map(movie => <Card key={movie.id} item={movie} linkHref={`/movie/${movie.title}`} />)
          }
        </Carousel>
        <div className={s.commentsBlock}>
          <Title className={s.commentsTitle}>{t("moviePage:comments")}</Title>
          <div className={s.commentsContainer}>
            <CommentList comments={comments.filter(comment => comment.commentId === null)} allComments={comments} movieId={movie.id} />
            {
              user &&
              <form onSubmit={handleFormSubmit} className={s.form}>
                <TextArea value={value} onChange={handleTextAreaChange} placeholder={t("moviePage:leaveComment") as string} className={s.input} />
                <div className={s.buttonsContainer}>
                  <button className={s.submitBtn}>
                    <Image src={check} alt="check" />
                  </button>
                </div>
              </form>
            }
          </div>
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

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<Record<string, unknown>>> => {

  const title = context.params?.title as string;
  const movie = await entitiesService.getMovieByTitle(title);
  const recommendations = await entitiesService.getRecommendedMovies(movie);

  return {
    props: {
      movie,
      recommendations: recommendations.filter(recMovie =>
        recMovie.title !== movie.title
        && recMovie.horizontalPhoto),
      ...(await serverSideTranslations(context.locale as string, [
        "common",
        "header",
        "footer",
        "moviePage"
      ])),
    }
  }
}