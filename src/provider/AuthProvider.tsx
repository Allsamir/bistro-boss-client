import React, { createContext, useState } from "react";
import { UserCredential } from "firebase/auth";
import { auth } from "../config/firebase.config";

interface AuthContextType {
  user: UserCredential | null;
  loading: boolean;
}

interface ChildProps {
  children: React.ReactNode;
}
const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<ChildProps> = ({ children }) => {
  const [user, setUser] = useState<null | UserCredential>(null);
  const [loading, setLoading] = useState(true);
  const authInfo = {
    user,
    loading,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
