import { IUser } from "@/types/IUser";
import { createSlice } from "@reduxjs/toolkit";
import { login } from "../thunks/login";
import { logout } from "../thunks/logout";
import { checkAuth } from "../thunks/checkAuth";
import { register } from "../thunks/register";
import { registerAdmin } from "../thunks/registerAdmin";
import { vkLogin } from "../thunks/vkLogin";

interface IInitialState {
  user: IUser,
  isAuth: boolean,
  isLoading: boolean;
}

const initialState: IInitialState = {
  user: {} as IUser,
  isAuth: false,
  isLoading: false,
}

// TODO - registration
export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder.addCase(register.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload?.accessToken as string);
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(register.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(register.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(registerAdmin.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload?.accessToken as string);
      state.user = action.payload.user;
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(registerAdmin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(registerAdmin.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(login.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload?.accessToken as string);
      state.user = action.payload?.user as IUser;
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(login.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(logout.fulfilled, (state, action) => {
      localStorage.removeItem("token");
      localStorage.removeItem("vkToken");
      state.user = {} as IUser;
      state.isAuth = false;
      state.isLoading = false;
    });
    builder.addCase(logout.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(logout.rejected, (state, action) => {
      state.isLoading = false;
    });

    builder.addCase(checkAuth.fulfilled, (state, action) => {
      localStorage.setItem("token", action.payload?.accessToken as string);
      state.user = action.payload?.user as IUser;
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(checkAuth.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(checkAuth.rejected, (state, action) => {
      state.user = {} as IUser;
      state.isAuth = false;
      state.isLoading = false;
    });

    builder.addCase(vkLogin.fulfilled, (state, action) => {
      localStorage.setItem("vkToken", action.payload?.access_token as string);
      state.isAuth = true;
      state.isLoading = false;
    });
    builder.addCase(vkLogin.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(vkLogin.rejected, (state, action) => {
      state.isAuth = false;
      state.isLoading = false;
    });
  }
});

export default authSlice.reducer;