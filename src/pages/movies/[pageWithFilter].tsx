import React, { FC, ReactElement } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import s from "./Genre.module.scss";
import Head from "next/head";

interface Props {

}

const Genre: NextPageWithLayout<Props> = ({ }) => {
  return (
    <>
      <Head>
        <title>Фильмы</title>
        <meta
          name="description"
          content="Смотреть фильмы онлайн в хорошем качестве"
        />
      </Head>
      <div>
        page with filter
      </div>
    </>
  )
};

Genre.getLayout = (page: ReactElement) => {
  return (
    <MoviesPageLayout>{page}</MoviesPageLayout>
  )
}

export default Genre;
