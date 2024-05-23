import { useEffect, useState } from "react";
import usePublicAxios from "./usePublicAxios";
import NUser from "../interfaces/NUser";
import useAuth from "./useAuth";

const useUser = () => {
  const publicAxios = usePublicAxios();
  const [nUser, setNUser] = useState<NUser[]>([]);
  const { user } = useAuth();
  const [userData] = nUser;
  console.log(nUser);
  useEffect(() => {
    publicAxios
      .get(`/single-user?email=${user?.email}`)
      .then((res) => setNUser(res.data));
  }, [publicAxios, user]);
  return userData;
};

export default useUser;
