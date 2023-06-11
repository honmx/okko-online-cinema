import React, { FC, ReactNode } from "react";
import { GetStaticProps, GetStaticPropsResult } from "next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Title from "@/components/UI/Title/Title";
import CustomLink from "@/components/UI/CustomLink/CustomLink";
import Layout from "@/components/Layout/Layout";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import s from "./NotFound.module.scss";

interface Props {

}

const NotFound: NextPageWithLayout<Props> = ({ }) => {

  const { t } = useTranslation("notFoundPage");

  const isSmaller = useSmallerDevice(959);

  return (
    <div className={s.pageWrapper}>
      <div className={s.textContainer}>
        <Title fs={isSmaller ? "35px" : "50px"} className={s.title}>{t("notFoundPage:title")}</Title>
        <CustomLink href="/" className={s.link}>{t("notFoundPage:link")}</CustomLink>
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