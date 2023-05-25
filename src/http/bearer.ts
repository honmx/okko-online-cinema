import axios from "axios";

const bearerAxios = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_AUTH_API_URL
});

bearerAxios.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default bearerAxios;