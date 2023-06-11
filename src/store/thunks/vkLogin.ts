import authService from "../../services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const vkLogin = createAsyncThunk(
  "auth/vkLogin",
  async (code: string, { rejectWithValue }) => {
    try {
      const response = await authService.loginWithVk(code);
      return response.data;

    } catch (error) {
      rejectWithValue(error);
    }
  }
);