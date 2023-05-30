import React, { FC, useEffect, useState } from "react";
import s from "./AdminMovies.module.scss";
import { GetStaticProps, NextPage } from "next";
import entitiesService from "@/services/entitiesService";
import { IMovie } from "@/types/IMovie";
import Image from "next/image";
import AdminMovieCard from "@/components/AdminMovieCard/AdminMovieCard";
import InputField from "@/components/UI/InputField/InputField";
import { useDebounce } from "@/hooks/useDebounce";

interface Props {
  movies: IMovie[];
}

const AdminMovies: NextPage<Props> = ({ movies }) => {

  
  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>(movies);
  const [value, setValue] = useState<string>("");
  
  const debouncedValue = useDebounce(value);
  
  useEffect(() => {
    setFilteredMovies(movies.filter(movie =>
      movie.title.toLowerCase().includes(value)
      || movie.originalTitle?.toLowerCase().includes(value)));
  }, [debouncedValue]);

  const handleChange = (value: string) => {
    setValue(value);
  }

  return (
    <div className={s.adminMoviesPageContainer}>
      <InputField type="text" value={value} placeholder="Название фильма" onChange={handleChange} appearanceType="transparent" className={s.input} />
      <div className={s.moviesContainer}>
        {
          filteredMovies.map(movie => <AdminMovieCard key={movie.id} movie={movie} />)
        }
      </div>
    </div>
  )
};

export const getStaticProps: GetStaticProps = async () => {

  const movies = await entitiesService.getAdminMovies();

  return {
    props: {
      movies: movies.filter(movie => movie.horizontalPhoto)
    }
  }
}

export default AdminMovies;
