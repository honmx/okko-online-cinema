import React, { FC, ReactNode } from "react";
import { GetStaticPaths, GetStaticProps, NextPage } from "next";
import axios from "axios";
import { IMovie } from "@/types/IMovie";
import { ParsedUrlQuery } from "querystring";
import { IPerson } from "@/types/IPerson";
import Title from "@/components/UI/Title/Title";
import Image from "next/image";
import s from "./Person.module.scss";
import { useSmallerDevice } from "@/hooks/useSmallerDevice";
import Range from "@/components/UI/Range/DesktopRange/DesktopRange";
import DesktopFilters from "@/components/Filters/DesktopFilters/DesktopFilters";
import MobileFilters from "@/components/Filters/MobileFilters/MobileFilters";
import MovieList from "@/components/MovieList/MovieList";
import entitiesService from "@/services/entitiesService";

interface Props {
  person: IPerson;
  movies: IMovie[];
}

const Person: NextPage<Props> = ({ person, movies }) => {

  console.log(person);
  console.log(movies);

  const isSmaller = useSmallerDevice(959);

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
        {
          isSmaller
            ? <MobileFilters showActorFilter={false} showProducerFilter={false} />
            : <DesktopFilters showActorFilter={false} showProducerFilter={false} />
        }
      </div>
      <Title variant="h2">Фильмы</Title>
      <MovieList movies={movies} className={s.movies} />
    </div>
  )
};

interface Params extends ParsedUrlQuery {
  personName: string;
}

export const getStaticPaths: GetStaticPaths<Params> = async () => {

  const response = await axios.get<IMovie[]>("/movie");
  const movies = response.data;

  return {
    paths: movies.map(movie => ({
      params: {
        personName: movie.people[2].fullName
      }
    })),
    fallback: "blocking"
  }
}

export const getStaticProps: GetStaticProps = async (context) => {

  // TODO - refactor
  const personName = context.params?.personName;
  const personResponse = await axios.get<IPerson[]>("/movie/12/people");
  const person = personResponse.data[2];

  const movies = await entitiesService.getMoviesByPersonName(person.fullName);

  return {
    props: {
      person,
      movies
    }
  }
}

export default Person;