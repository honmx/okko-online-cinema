import axios from "axios";

const $commentsAPI = axios.create({
  withCredentials: true,
  baseURL: process.env.NEXT_PUBLIC_COMMENTS_API_URL
});

$commentsAPI.interceptors.request.use(config => {
  config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  return config;
});

export default $commentsAPI;