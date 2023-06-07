import authService from "../../services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IParams {
  email: string;
  password: string;
}

export const register = createAsyncThunk(
  "auth/register",
  async ({ email, password }: IParams, { rejectWithValue }) => {
    try {
      const response = await authService.register(email, password);

      console.log(response);

      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
)