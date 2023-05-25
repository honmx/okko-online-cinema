import $authAPI from "@/http/auth"
import bearerAxios from "@/http/bearer";
import { IAuthResponse } from "@/types/IAuthResponse";
import { IUser } from "@/types/IUser";
import axios, { AxiosResponse } from "axios";

const checkEmail = async (email: string): Promise<AxiosResponse<IUser>> => {
  const response = await $authAPI.get<IUser>(`/check/${email}`);

  return response;
}

const login = async (email: string, password: string): Promise<AxiosResponse<IAuthResponse>> => {
  const response = await $authAPI.post<IAuthResponse>("/login", {
    email,
    password
  });

  return response;
}

const register = async (email: string, password: string) => {
  const response = await $authAPI.post<any>("/registration", {
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


export default { checkEmail, login, register, logout, checkAuth };