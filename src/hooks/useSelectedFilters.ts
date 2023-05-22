import { useAppSelector } from "@/store/hooks";

export const useSelectedFilters = () => {
  const selectedGenre = useAppSelector(state => state.moviesFilters.selectedGenre);
  const selectedCountry = useAppSelector(state => state.moviesFilters.selectedCountry);
  const selectedMinRating = useAppSelector(state => state.moviesFilters.selectedMinRating);
  const selectedMinCountOfRating = useAppSelector(state => state.moviesFilters.selectedMinCountOfRating);
  const selectedProducer = useAppSelector(state => state.moviesFilters.selectedProducer);
  const selectedActor = useAppSelector(state => state.moviesFilters.selectedActor);
  const selectedSortBy = useAppSelector(state => state.moviesFilters.selectedSortBy);

  return {
    selectedGenre,
    selectedCountry,
    selectedMinRating,
    selectedMinCountOfRating,
    selectedProducer,
    selectedActor,
    selectedSortBy,
  }
}