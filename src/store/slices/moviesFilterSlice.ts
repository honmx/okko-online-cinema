import { IText } from "@/types/IText";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  selectedGenre: IText;
  selectedCountry: IText;
  minRating: number;
  minCountOfRating: number;
  producer: string;
  actor: string;
  sortBy: IText;
}

const initialState: IInitialState = {
  selectedGenre: {en: "All", ru: "Все"},
  selectedCountry: {en: "All", ru: "Все"},
  minRating: 0,
  minCountOfRating: 0,
  producer: "",
  actor: "",
  sortBy: {en: "All", ru: "Все"},
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
    setMinRating(state, action: PayloadAction<number>) {
      state.minRating = action.payload;
    },
    setMinCountOfRating(state, action: PayloadAction<number>) {
      state.minCountOfRating = action.payload;
    },
    setProducer(state, action: PayloadAction<string>) {
      state.producer = action.payload;
    },
    setActor(state, action: PayloadAction<string>) {
      state.actor = action.payload;
    },
    setSortBy(state, action: PayloadAction<IText>) {
      state.sortBy = action.payload;
    },
    applyFilters(state, action: PayloadAction<IInitialState>) {
      return action.payload;
    },
    clearFilters(state) {
      state.selectedGenre = {en: "All", ru: "Все"};
      state.selectedCountry = {en: "All", ru: "Все"};
      state.minRating = 0;
      state.minCountOfRating = 0;
      state.producer = "";
      state.actor = "";
      state.sortBy = {en: "All", ru: "Все"};
    }
  }
});

export default moviesFilterSlice.reducer;
export const {
  setSelectedGenre,
  setSelectedCountry,
  setMinRating,
  setMinCountOfRating,
  setProducer,
  setActor,
  setSortBy,
  applyFilters,
  clearFilters,
} = moviesFilterSlice.actions;