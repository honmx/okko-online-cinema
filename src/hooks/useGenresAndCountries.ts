import { useEffect, useState } from "react"
import entitiesService from "@/services/entitiesService";
import { IGenre } from "@/types/IGenre";

export const useGenresAndCountries = () => {
  const [genres, setGenres] = useState<IGenre[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const getGenresAndCountries = async () => {
      const movies = await entitiesService.getMovies();
      const genres = await entitiesService.getGenres();

      const countries = new Set<string>();

      movies.forEach(movie => movie.country.split(", ").forEach(country => countries.add(country)));

      setGenres(genres);
      setCountries(Array.from(countries));
    }

    getGenresAndCountries();
  }, []);

  return {
    genres,
    countries
  }
}