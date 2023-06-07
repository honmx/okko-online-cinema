import authService from "../../services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IParams {
  email: string;
  password: string;
}

export const login = createAsyncThunk(
  "auth/login",
  async ({ email, password }: IParams, { rejectWithValue }) => {
    try {
      const response = await authService.login(email, password);

      console.log(response);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
)