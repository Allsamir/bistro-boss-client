import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";

const secureAxios = axios.create({
  baseURL: "https://cafe-gratitude-server.vercel.app",
  withCredentials: true,
});

const useSecureAxios = () => {
  // Add a request interceptor
  secureAxios.interceptors.request.use(
    (config) => {
      const token = localStorage.getItem("token");
      if (token) {
        config.headers.token = JSON.parse(token);
      }
      return config;
    },
    (error) => {
      console.error("Request Error:", error); // Logging request errors
      return Promise.reject(error);
    },
  );

  // Add a response interceptor
  secureAxios.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      console.error("Response Error:", error.response); // Logging response errors
      if (error.response?.status === 401 || error.response?.status === 403) {
        signOut(auth).then(() => {
          console.log("User logout");
        });
      }
      return Promise.reject(error);
    },
  );

  return secureAxios;
};

export default useSecureAxios;
