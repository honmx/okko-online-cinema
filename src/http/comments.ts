import axios from "axios";
import bearerAxios from "./bearer";
import { IAuthResponse } from "@/types/IAuthResponse";

const $commentsAPI = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_COMMENTS_API_URL
});

$commentsAPI.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

$commentsAPI.interceptors.response.use(
  config => config,
  async error => {

    const originalRequestConfig = error.config;

    if (originalRequestConfig && !originalRequestConfig?._isRetry) {
      originalRequestConfig._isRetry = true;

      try {
        const response = await bearerAxios.get<IAuthResponse>("/refresh");
        localStorage.setItem("token", response.data.accessToken);
        return $commentsAPI.request(originalRequestConfig);

      } catch (error) {
        console.log(error);
      }
    }

    throw error;
  }
)

export default $commentsAPI;