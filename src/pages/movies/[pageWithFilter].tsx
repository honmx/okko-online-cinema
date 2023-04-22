import React, { FC, ReactElement } from "react";
import s from "./Genre.module.scss";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import FilmsPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";

interface Props {

}

const Genre: NextPageWithLayout<Props> = ({ }) => {
  return (
    <div>
      page with filter
    </div>
  )
};

Genre.getLayout = (page: ReactElement) => {

  return (
    <FilmsPageLayout>{page}</FilmsPageLayout>
  )
}

export default Genre;
