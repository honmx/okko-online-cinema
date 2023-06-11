import authService from "../../services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

interface IParams {
  email: string;
  password: string;
}

export const registerAdmin = createAsyncThunk(
  "auth/registerAdmin",
  async ({ email, password }: IParams, { rejectWithValue }) => {
    try {
      const response = await authService.registerAdmin(email, password);
      return response.data;

    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
)