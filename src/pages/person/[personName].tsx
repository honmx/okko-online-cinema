import React from "react";
import { ParsedUrlQuery } from "querystring";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult } from "next";
import Image from "next/image";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";
import Head from "next/head";
import Title from "@/components/UI/Title/Title";
import Filters from "@/components/Filters/Filters";
import MovieList from "@/components/MovieList/MovieList";
import { IMovie } from "@/types/IMovie";
import { IPerson } from "@/types/IPerson";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import entitiesService from "@/services/entitiesService";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import { useGenresAndCountries } from "@/hooks/useGenresAndCountries";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { useFilteredMovies } from "@/hooks/useFilteredMovies";
import s from "./Person.module.scss";

interface Props {
  person: IPerson;
  movies: IMovie[];
}

const Person: NextPageWithLayout<Props> = ({ person, movies }) => {

  const { t, i18n } = useTranslation("personPage");
  const lang = i18n.language;

  const { genres, countries } = useGenresAndCountries();

  const filteredMovies = useFilteredMovies(movies);

  return (
    <>
      <Head>
        <title>{lang === "en" && person.fullNameOrig ? person.fullNameOrig : person.fullName}</title>
      </Head>
      <div className={s.personContainer}>
        <div className={s.personCard}>
          {
            person.photo &&
            <div className={s.imgWrapper}>
              {<Image src={person.photo} alt={person.fullName} width={1080} height={1920} />}
            </div>
          }
          <div className={s.personDescription}>
            <Title variant="h1" className={s.name}>{lang === "en" && person.fullNameOrig ? person.fullNameOrig : person.fullName}</Title>
            <p className={s.profession}>{person.profession === "Актёр" ? t("personPage:actor") : t("personPage:producer")}</p>
          </div>
        </div>
        <div className={s.filtersContainer}>
          <Filters genres={genres} countries={countries} showActorFilter={false} showProducerFilter={false} />
        </div>
        <Title variant="h2">{t("personPage:movies")}</Title>
        <MovieList movies={filteredMovies} className={s.movies} />
      </div>
    </>
  )
};

interface Params extends ParsedUrlQuery {
  personName: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {

  const people = await entitiesService.getPeople();

  return {
    paths: people.map(person => ({
      params: {
        personName: person.fullName
      }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (context): Promise<GetStaticPropsResult<Record<string, unknown>>> => {

  const personName = context.params?.personName as string;
  const persons = await entitiesService.getPersonByName(personName);
  const person = persons[0];
  const movies = await entitiesService.getMoviesByPersonName(person.fullName);

  return {
    props: {
      person,
      movies,
      ...(await serverSideTranslations(context.locale as string, [
        "common",
        "header",
        "footer",
        "moviesPage",
        "personPage"
      ])),
    }
  }
}

export default Person;