import { useQuery } from "@tanstack/react-query";
import usePublicAxios from "./usePublicAxios";

const useSecureMenu = () => {
  const publicAxios = usePublicAxios();
  const { data: menus } = useQuery({
    queryKey: ["menuS"],
    queryFn: async () =>
      await publicAxios.get(`/menus`).then((res) => res.data),
  });
  return menus;
};

export default useSecureMenu;
