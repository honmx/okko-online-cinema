import { configureStore } from "@reduxjs/toolkit";
import moviesFilterSlice from "./slices/moviesFilterSlice";
import languageSlice from "./slices/languageSlice";
import notificationSlice from "./slices/notificationSlice";

export const store = configureStore({
  reducer: {
    moviesFilters: moviesFilterSlice,
    language: languageSlice,
    notifications: notificationSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;