import $authAPI from "../http/auth";
import bearerAxios from "../http/bearer";
import { IAuthResponse } from "../types/IAuthResponse";
import { IUser } from "../types/IUser";
import axios, { AxiosResponse } from "axios";

const checkEmail = async (email: string): Promise<AxiosResponse<IUser | "" | undefined>> => {
  try {
    const response = await $authAPI.get<IUser>(`/check/${email}`);

    return response;
  } catch (error) {
    throw error;
  }
}

const login = async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
  const response = await $authAPI.post<IAuthResponse>("/login", {
    email,
    password
  });

  return response;
}

const register = async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
  const response = await $authAPI.post<IAuthResponse>("/registration", {
    email,
    password
  });

  return response;
}

const logout = async (): Promise<void> => {
  await $authAPI.post<void>("/logout");
}

const checkAuth = async (): Promise<AxiosResponse<IAuthResponse>> => {
  const response = await bearerAxios.get<IAuthResponse>("/refresh");

  return response;
}

const loginWithVk = async (code: string) => {
  const response = await axios.post<IVKAuthResponse>(`${process.env.NEXT_PUBLIC_AUTH_API_URL}/login/vk`, { code });

  return response;
}


export default {
  checkEmail,
  login,
  register,
  logout,
  checkAuth,
  loginWithVk
};