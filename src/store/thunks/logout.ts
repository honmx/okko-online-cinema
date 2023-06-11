import authService from "../../services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const logout = createAsyncThunk(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.logout();
      return response;
      
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
)