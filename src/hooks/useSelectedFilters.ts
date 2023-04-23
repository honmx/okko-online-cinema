import { useAppSelector } from "@/store/hooks";

export const useSelectedFilters = () => {
  const genre = useAppSelector(state => state.moviesFilters.selectedGenre);
  const country = useAppSelector(state => state.moviesFilters.selectedCountry);
  const minRating = useAppSelector(state => state.moviesFilters.minRating);
  const minCountOfRating = useAppSelector(state => state.moviesFilters.minCountOfRating);
  const producer = useAppSelector(state => state.moviesFilters.producer);
  const actor = useAppSelector(state => state.moviesFilters.actor);
  const sortBy = useAppSelector(state => state.moviesFilters.sortBy);

  return {
    genre,
    country,
    minRating,
    minCountOfRating,
    producer,
    actor,
    sortBy,
  }
}