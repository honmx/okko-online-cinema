import { IText } from "@/types/IText";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  selectedGenre: IText;
  selectedCountry: IText;
  selectedMinRating: number;
  selectedMinCountOfRating: number;
  selectedProducer: string;
  selectedActor: string;
  selectedSortBy: IText;
}

const initialState: IInitialState = {
  selectedGenre: {en: "All", ru: "Все"},
  selectedCountry: {en: "All", ru: "Все"},
  selectedMinRating: 0,
  selectedMinCountOfRating: 0,
  selectedProducer: "",
  selectedActor: "",
  selectedSortBy: {en: "All", ru: "Все"},
} 

const moviesFilterSlice = createSlice({
  name: "moviesFilter",
  initialState,
  reducers: {
    setSelectedGenre(state, action: PayloadAction<IText>) {
      state.selectedGenre = action.payload;
    },
    setSelectedCountry(state, action: PayloadAction<IText>) {
      state.selectedCountry = action.payload;
    },
    setSelectedMinRating(state, action: PayloadAction<number>) {
      state.selectedMinRating = action.payload;
    },
    setSelectedMinCountOfRating(state, action: PayloadAction<number>) {
      state.selectedMinCountOfRating = action.payload;
    },
    setSelectedProducer(state, action: PayloadAction<string>) {
      state.selectedProducer = action.payload;
    },
    setSelectedActor(state, action: PayloadAction<string>) {
      state.selectedActor = action.payload;
    },
    setSelectedSortBy(state, action: PayloadAction<IText>) {
      state.selectedSortBy = action.payload;
    },
    applyFilters(state, action: PayloadAction<IInitialState>) {
      return action.payload;
    },
    clearFilters(state) {
      state.selectedGenre = {en: "All", ru: "Все"};
      state.selectedCountry = {en: "All", ru: "Все"};
      state.selectedMinRating = 0;
      state.selectedMinCountOfRating = 0;
      state.selectedProducer = "";
      state.selectedActor = "";
      state.selectedSortBy = {en: "All", ru: "Все"};
    }
  }
});

export default moviesFilterSlice.reducer;
export const {
  setSelectedGenre,
  setSelectedCountry,
  setSelectedMinRating,
  setSelectedMinCountOfRating,
  setSelectedProducer,
  setSelectedActor,
  setSelectedSortBy,
  applyFilters,
  clearFilters,
} = moviesFilterSlice.actions;