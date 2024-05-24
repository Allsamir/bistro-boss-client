import useSecureAxios from "./useSecureAxios";
import useAuth from "./useAuth";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const secureAxios = useSecureAxios();
  const { user } = useAuth();

  const {
    data: isAdmin,
    isLoading: isAdminPending,
    error,
  } = useQuery({
    queryKey: ["admin", user?.email], // Ensure the query key includes the user email
    queryFn: async () => {
      const response = await secureAxios.get(
        `/user/admin?email=${user?.email}`,
      );
      return response.data;
    },
    enabled: !!user?.email, // Only run the query if the user is logged in
  });

  return { isAdmin, isAdminPending, error };
};

export default useAdmin;
