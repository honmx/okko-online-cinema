import { capitalize } from "@/helpers/capitalize";
import entitiesService from "@/services/entitiesService";
import { useEffect, useState } from "react"

export const useGenresAndCountries = () => {
  const [genres, setGenres] = useState<string[]>([]);
  const [countries, setCountries] = useState<string[]>([]);

  useEffect(() => {
    const getGenresAndCountries = async () => {
      const movies = await entitiesService.getMovies();
      
      const genres = new Set<string>();
      const countries = new Set<string>();

      movies.forEach(movie => movie.genres.forEach(genre => genres.add(capitalize(genre.genre))));
      movies.forEach(movie => movie.country.split(", ").forEach(country => countries.add(country)));

      setGenres(Array.from(genres));
      setCountries(Array.from(countries));
    }

    getGenresAndCountries();
  }, []);

  return {
    genres,
    countries
  }
}