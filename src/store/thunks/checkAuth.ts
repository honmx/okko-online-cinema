import authService from "../../services/authService";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const response = await authService.checkAuth();

      // const newAxios = axios.create({
      //   baseURL: "http://localhost:5000",
      //   // withCredentials: true
      // });

      // const res = await newAxios.post(`/user/addrole/${response.data.user.id}`, {
      //   value: "ADMIN",
      //   description: "Администратор"
      // });

      // console.log(res);
      
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error.message);
    }
  }
);