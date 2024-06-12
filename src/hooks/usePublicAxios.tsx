import axios from "axios";
const publicAxios = axios.create({
  baseURL: "https://cafe-gratitude-server.vercel.app",
});
const usePublicAxios = () => {
  return publicAxios;
};

export default usePublicAxios;
