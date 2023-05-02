import { RootState } from "@/store/store";

type FiltersType = Pick<RootState, "moviesFilters">;

export const areFiltersClear = (filters: FiltersType[keyof FiltersType]) => {
  return filters.selectedGenre.en === "All" && filters.selectedCountry.en === "All"
    && filters.minRating === 0 && filters.minCountOfRating === 0 && filters.selectedProducer === ""
    && filters.selectedActor === "" && filters.sortBy.en === "All";
}