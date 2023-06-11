import React, { FC, ReactNode } from "react";
import s from "./NotFound.module.scss";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import Title from "@/components/UI/Title/Title";
import IconButton from "@/components/UI/IconButton/IconButton";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import Layout from "@/components/Layout/Layout";

interface Props {

}

const NotFound: NextPageWithLayout<Props> = ({ }) => {
  return (
    <div className={s.pageWrapper}>
      <div className={s.textContainer}>
        <Title fs="50px">Страница не найдена</Title>
        <CustomLink href="/" className={s.link}>На главную</CustomLink>
      </div>
    </div>
  )
};

NotFound.getLayout = (page: ReactNode) => {
  return <Layout>{page}</Layout>
}

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<Record<string, unknown>>> => {

  return {
    props: {
      ...(await serverSideTranslations(context.locale as string, [
        "common",
        "header",
        "footer",
        "notFoundPage"
      ])),
    }
  }
}

export default NotFound;