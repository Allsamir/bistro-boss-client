import React, { createContext, useEffect, useState } from "react";
import {
  User,
  UserCredential,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "../config/firebase.config";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  createUser: (email: string, password: string) => Promise<UserCredential>;
}

interface ChildProps {
  children: React.ReactNode;
}
export const AuthContext = createContext<AuthContextType | null>(null);

const AuthProvider: React.FC<ChildProps> = ({ children }) => {
  const [user, setUser] = useState<null | User>(null);
  const [loading, setLoading] = useState(true);
  const createUser = (email: string, password: string) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        // User is signed out
        // ...
      }
    });
    return () => {
      return unsubscribe();
    };
  }, []);
  const authInfo = {
    user,
    loading,
    createUser,
  };
  return (
    <AuthContext.Provider value={authInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProvider;
