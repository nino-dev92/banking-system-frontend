import axios, { type AxiosInstance } from "axios";

const apiAxios: AxiosInstance = axios.create({
  baseURL: "https://banking-system-backend-qzht.onrender.com/api",
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default apiAxios;
