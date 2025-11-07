import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.BASE_URL,
  headers: { "Content-Type": "Aplication/JSON" },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export default api;
