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
    switchLanguage(state) {
      state.language = state.language === "ru" ? "en" : "ru";
    }
  }
});

export const { switchLanguage } = languageSlice.actions;
export default languageSlice.reducer;