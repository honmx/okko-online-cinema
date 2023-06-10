import React, { FC, ReactNode, useEffect, useState } from "react";
import { GetStaticPaths, GetStaticProps, GetStaticPropsResult, NextPage } from "next";
import axios from "axios";
import { IMovie } from "@/types/IMovie";
import { ParsedUrlQuery } from "querystring";
import { IPerson } from "@/types/IPerson";
import Title from "@/components/UI/Title/Title";
import Image from "next/image";
import s from "./Person.module.scss";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import Range from "@/components/UI/Range/DesktopRange/DesktopRange";
import Filters from "@/components/Filters/Filters";
import MobileFilters from "@/components/Filters/Filters";
import MovieList from "@/components/MovieList/MovieList";
import entitiesService from "@/services/entitiesService";
import { NextPageWithLayout } from "@/types/NextPageWithLayout";
import MoviesPageLayout from "@/components/MoviesPageLayout/MoviesPageLayout";
import { useGenresAndCountries } from "@/hooks/useGenresAndCountries";
import { useSelectedFilters } from "@/hooks/useSelectedFilters";
import { useFilteredMovies } from "@/hooks/useFilteredMovies";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useTranslation } from "next-i18next";

interface Props {
  person: IPerson;
  movies: IMovie[];
}

const Person: NextPageWithLayout<Props> = ({ person, movies }) => {

  const { t, i18n } = useTranslation("personPage");
  const lang = i18n.language;

  const isSmaller = useSmallerDevice(959);

  const { genres, countries } = useGenresAndCountries();

  const {
    selectedGenre,
    selectedCountry,
    selectedMinRating,
    selectedMinCountOfRating,
    selectedSortBy
  } = useSelectedFilters();

  const filteredMovies = useFilteredMovies(movies);

  return (
    <div className={s.personContainer}>
      <div className={s.personCard}>
        {
          person.photo &&
          <div className={s.imgWrapper}>
            {<Image src={person.photo} alt={person.fullName} width={1080} height={1920} />}
          </div>
        }
        <div className={s.personDescription}>
          <Title variant="h1" className={s.name}>{person.fullName}</Title>
          <p className={s.profession}>{person.profession}</p>
        </div>
      </div>
      <div className={s.filtersContainer}>
        <Filters genres={genres} countries={countries} showActorFilter={false} showProducerFilter={false} />
      </div>
      <Title variant="h2">{t("personPage:movies")}</Title>
      <MovieList movies={filteredMovies} className={s.movies} />
    </div>
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