import axios from "axios";
import bearerAxios from "./bearer";
import { IAuthResponse } from "@/types/IAuthResponse";

const $authAPI = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
});

$authAPI.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$authAPI.interceptors.response.use(
  config => config,
  async error => {

    const originalRequestConfig = error.config;

    if (error.response.status === 401 && originalRequestConfig && !originalRequestConfig?._isRetry) {
      originalRequestConfig._isRetry = true;

      try {
        const response = await bearerAxios.get<IAuthResponse>("/refresh");
        localStorage.setItem("token", response.data.accessToken);
        return $authAPI.request(originalRequestConfig);

      } catch (error) {
        console.log(error);
      }
    }

    throw error;
  }
)

export default $authAPI;