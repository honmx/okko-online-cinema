import React, { FC, ReactElement } from "react";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import FilmsPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import s from "./Genre.module.scss";

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
