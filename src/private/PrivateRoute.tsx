import React from "react";
import useAuth from "../hooks/useAuth";
import { Navigate, useLocation } from "react-router-dom";

interface ChildProps {
  children: React.ReactNode;
}
const PrivateRoute: React.FC<ChildProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user) {
    return children;
  }
  return <Navigate to={`/login`} state={location.pathname} replace></Navigate>;
};

export default PrivateRoute;
