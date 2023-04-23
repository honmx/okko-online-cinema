import { configureStore } from "@reduxjs/toolkit";
import moviesFilterSlice from "./slices/moviesFilterSlice";
import languageSlice from "./slices/languageSlice";

export const store = configureStore({
  reducer: {
    moviesFilters: moviesFilterSlice,
    language: languageSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;