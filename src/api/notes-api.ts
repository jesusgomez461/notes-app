import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// api.defaults.headers.common["Accept-Language"] = "es";
api.defaults.headers.common["User-TimeZone"] =
  Intl.DateTimeFormat().resolvedOptions().timeZone;

export default api;
