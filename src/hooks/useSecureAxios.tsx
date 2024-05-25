import axios from "axios";
import { signOut } from "firebase/auth";
import { auth } from "../config/firebase.config";
import Swal from "sweetalert2";

const secureAxios = axios.create({
  baseURL: "http://localhost:3000",
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
      console.log("Request Config:", config); // Logging the request config
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
          const errorMessage =
            error.response.status === 401
              ? "Unauthorized. Please log in again."
              : "This data doesn't belong to you. Please log in again.";
          Swal.fire({
            title: `Error ${error.response.status}`,
            text: errorMessage,
            icon: "error",
          });
        });
      }
      return Promise.reject(error);
    },
  );

  return secureAxios;
};

export default useSecureAxios;
