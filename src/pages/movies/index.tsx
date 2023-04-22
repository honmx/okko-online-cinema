import React, { ReactNode } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import Carousel from "@/components/UI/Carousel/Carousel";
import { movie } from "../../helpers/data/data.json";
import Card from "@/components/UI/Card/Card";
import s from "./Movies.module.scss";

interface Props {

}

const Movies: NextPageWithLayout<Props> = ({ }) => {

  return (
    <div className={s.moviesContainer}>
      <div className={s.block}>
        <Carousel title="Рекомендуемое" linkHref="/films/recommended" className={s.carousel}>
          {movie.map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
        </Carousel>
        <Carousel title="Новинки" linkHref="/films/new" className={s.carousel}>
          {movie.map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
        </Carousel>
        <Carousel title="Лучшее" linkHref="/films/best" className={s.carousel}>
          {movie.map(movie => <Card key={movie.id} item={movie} linkHref={movie.title} />)}
        </Carousel>
      </div>
    </div>
  )
};

Movies.getLayout = (page: ReactNode) => {
  return (
    <MoviesPageLayout>{page}</MoviesPageLayout>
  )
}

export default Movies;
