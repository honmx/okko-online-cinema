import axios from "axios";

const $entitiesAPI = axios.create({
  baseURL: process.env.NEXT_PUBLIC_ENTITIES_API_URL,
});

export default $entitiesAPI;