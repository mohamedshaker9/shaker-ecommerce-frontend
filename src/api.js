import axios from "axios";

console.log('BACKEND URL =', import.meta.env.VITE_BACK_END_API_URL);

const api = axios.create({
  baseURL: import.meta.env.VITE_BACK_END_API_URL,
  withCredentials: true,
});

export default api;