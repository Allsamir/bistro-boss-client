import axios from "axios";
const secureAxios = axios.create({
  baseURL: "http://localhost:3000",
  withCredentials: true,
});

const useSecureAxios = () => {
  secureAxios.interceptors.response.use(
    function (response) {
      // Any status code that lie within the range of 2xx cause this function to trigger
      // Do something with response data
      return response;
    },
    function (error) {
      // Any status codes that falls outside the range of 2xx cause this function to trigger
      // Do something with response error
      return Promise.reject(error);
    },
  );
  return secureAxios;
};

export default useSecureAxios;
