import { IMovie } from "@/types/IMovie";
import { useEffect, useState } from "react";
import { useSelectedFilters } from "./useSelectedFilters";
import { getDateFromMoviePremierString } from "@/helpers/getDateFromMoviePremierString";

export const useFilteredMovies = (movies: IMovie[]) => {
  const {
    selectedGenre, selectedCountry,
    selectedMinRating, selectedMinCountOfRating,
    selectedProducer, selectedActor, selectedSortBy
  } = useSelectedFilters();

  const [filteredMovies, setFilteredMovies] = useState<IMovie[]>(movies);

  useEffect(() => {
    const filtered = movies
      .filter(movie => selectedGenre === "Все"
        ? movie
        : movie.genres.map(genre => genre.title.toLowerCase()).includes(selectedGenre.toLowerCase()))
      .filter(movie => selectedCountry === "Все"
        ? movie
        : movie.country.split(", ").some(country => country.toLowerCase() === selectedCountry.toLowerCase()))
      .filter(movie => movie.rate >= selectedMinRating)
      .filter(movie => movie.rateQuantity >= selectedMinCountOfRating)
      .filter(movie => selectedProducer === ""
        ? movie
        : movie.people.filter(person => (person.profession.toLowerCase() === "режиссёр"
          || person.profession.toLowerCase() === "сценарист" || person.profession.toLowerCase() === "продюсер")
          && person.fullName.toLowerCase() === selectedProducer.toLowerCase()).length > 0)
      .filter(movie => selectedActor === ""
        ? movie
        : movie.people.filter(person => (person.profession.toLowerCase() === "актёр")
          && person.fullName.toLowerCase() === selectedActor.toLowerCase()).length > 0);

    if (selectedSortBy === "Все") {
      setFilteredMovies(filtered);
    } else {
      const sorted = Object.assign([], filtered) as IMovie[];

      sorted.sort((a, b) => {
        if (selectedSortBy === "По кол-ву оценок") return b.rateQuantity - a.rateQuantity;
        if (selectedSortBy === "По рейтингу") return b.rate - a.rate;
        if (selectedSortBy === "По дате выхода") return getDateFromMoviePremierString(b.premier) - getDateFromMoviePremierString(a.premier);
        if (selectedSortBy === "По алфавиту") return a.title.toLowerCase().localeCompare(b.title.toLowerCase());
        return 0;
      });

      setFilteredMovies(sorted);
    }

  }, [
    selectedGenre, selectedCountry,
    selectedMinRating, selectedMinCountOfRating,
    selectedProducer, selectedActor, selectedSortBy
  ]);

  return filteredMovies;
}