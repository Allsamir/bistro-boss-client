import { useQuery } from "@tanstack/react-query";
import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";
const useCart = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();
  const { data: cart = [] } = useQuery({
    queryKey: ["cart", user?.email],
    queryFn: async () =>
      await secureAxios.get(`/carts?email=${user?.email}`).then((res) => {
        return res.data;
      }),
  });
  return cart;
};

export default useCart;
