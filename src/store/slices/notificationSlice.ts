import { createId } from "../../helpers/createId";
import { INotification } from "@/types/INotification";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface IInitialState {
  notifications: INotification[];
}

const initialState: IInitialState = {
  notifications: [],
}

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    addNotification(state, action: PayloadAction<Omit<INotification, "id">>) {
      const id = createId();
      state.notifications.push({...action.payload, id});
    },
    deleteNotification(state, action: PayloadAction<number>) {
      state.notifications = state.notifications.filter(notification => notification.id !== action.payload)
    }
  }
});

export default notificationSlice.reducer;
export const { addNotification, deleteNotification } = notificationSlice.actions;