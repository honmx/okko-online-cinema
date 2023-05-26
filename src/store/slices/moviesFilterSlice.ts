import { IText } from "@/types/IText";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  selectedGenre: string;
  selectedCountry: string;
  selectedMinRating: number;
  selectedMinCountOfRating: number;
  selectedProducer: string;
  selectedActor: string;
  selectedSortBy: string;
}

const initialState: IInitialState = {
  selectedGenre: "Все",
  selectedCountry: "Все",
  selectedMinRating: 0,
  selectedMinCountOfRating: 0,
  selectedProducer: "",
  selectedActor: "",
  selectedSortBy: "Все",
} 

const moviesFilterSlice = createSlice({
  name: "moviesFilter",
  initialState,
  reducers: {
    setSelectedGenre(state, action: PayloadAction<string>) {
      state.selectedGenre = action.payload;
    },
    setSelectedCountry(state, action: PayloadAction<string>) {
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
    setSelectedSortBy(state, action: PayloadAction<string>) {
      state.selectedSortBy = action.payload;
    },
    applyFilters(state, action: PayloadAction<IInitialState>) {
      return action.payload;
    },
    clearFilters(state) {
      state.selectedGenre = "Все";
      state.selectedCountry = "Все";
      state.selectedMinRating = 0;
      state.selectedMinCountOfRating = 0;
      state.selectedProducer = "";
      state.selectedActor = "";
      state.selectedSortBy = "Все";
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