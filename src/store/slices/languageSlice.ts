import { createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  language: "ru" | "en";
}

const initialState: IInitialState = {
  language: "ru",
}

export const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    toggleLanguage(state) {
      state.language = state.language === "ru" ? "en" : "ru";
    }
  }
});

export const { toggleLanguage } = languageSlice.actions;
export default languageSlice.reducer;