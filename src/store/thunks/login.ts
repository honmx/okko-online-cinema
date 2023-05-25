import authService from "@/services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

type LoginParamsType = {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: LoginParamsType, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
)