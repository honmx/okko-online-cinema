import authService from "../../services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.checkAuth();
      return response.data;
      
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);