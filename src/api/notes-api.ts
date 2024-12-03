import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

// export const setAuthToken = () => {
//   const { session } = SessionStore();
//   console.log(session);

//   if (session) {
//     api.defaults.headers.Authorization = `Bearer ${session.access_token}`;
//   } else {
//     delete api.defaults.headers.Authorization;
//   }
// };

export default api;
