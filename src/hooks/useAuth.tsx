import { useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";

const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === null) {
    throw new Error("useAuth must be used in AuthProvider");
  }

  return context;
};

export default useAuth;
