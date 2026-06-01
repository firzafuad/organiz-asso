import axios from "axios";

export const BACK_URI = import.meta.env.BACK_URI || "http://localhost:8000";
export const api = axios.create({
  baseURL: BACK_URI,
  withCredentials: true
});