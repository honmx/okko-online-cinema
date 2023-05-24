import axios from "axios";

const $authAPI = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL,
});

$authAPI.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer wioroiwei`;
  return config;
});

export default $authAPI;