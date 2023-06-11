import { FC, ReactNode } from "react";
import { Provider } from "react-redux";
import { store } from "../store/store";

export const renderWithRedux = (component: ReactNode) => {
  return (
    <Provider store={store}>
      { component }
    </Provider>
  )
}