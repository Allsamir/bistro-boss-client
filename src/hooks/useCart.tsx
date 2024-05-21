import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";
import { useState } from "react";
const useCart = () => {
  const secureAxios = useSecureAxios();
  const [loadData, setLoaData] = useState(false);
  const { user } = useAuth();
  const { data } = useQuery({
    queryKey: ["cart"],
    queryFn: async () =>
      await secureAxios.get(`/carts?email=${user?.email}`).then((res) => {
        setLoaData(true);
        return res.data;
      }),
  });
  return [data, loadData];
};

export default useCart;
