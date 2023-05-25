import { configureStore } from "@reduxjs/toolkit";
import moviesFilterSlice from "./slices/moviesFilterSlice";
import languageSlice from "./slices/languageSlice";
import notificationSlice from "./slices/notificationSlice";
import authSlice from "./slices/authSlice";

export const store = configureStore({
  reducer: {
    moviesFilters: moviesFilterSlice,
    notifications: notificationSlice,
    language: languageSlice,
    auth: authSlice,
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;