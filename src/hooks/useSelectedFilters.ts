import { useAppSelector } from "@/store/hooks";

export const useSelectedFilters = () => {
  const selectedGenre = useAppSelector(state => state.moviesFilters.selectedGenre);
  const selectedCountry = useAppSelector(state => state.moviesFilters.selectedCountry);
  const minRating = useAppSelector(state => state.moviesFilters.minRating);
  const minCountOfRating = useAppSelector(state => state.moviesFilters.minCountOfRating);
  const selectedProducer = useAppSelector(state => state.moviesFilters.selectedProducer);
  const selectedActor = useAppSelector(state => state.moviesFilters.selectedActor);
  const sortBy = useAppSelector(state => state.moviesFilters.sortBy);

  return {
    selectedGenre,
    selectedCountry,
    minRating,
    minCountOfRating,
    selectedProducer,
    selectedActor,
    sortBy,
  }
}