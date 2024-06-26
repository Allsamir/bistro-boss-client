import React, { ReactNode } from "react";
import useAuth from "../hooks/useAuth";
import useAdmin from "../hooks/useAdmin";
import { Navigate } from "react-router-dom";

interface ChildProps {
  children: ReactNode;
}

const AdminRoute: React.FC<ChildProps> = ({ children }) => {
  const { user, loading } = useAuth();
  const { isAdmin, isAdminPending } = useAdmin();
  if (loading || isAdminPending) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }
  if (user && isAdmin.role === "admin") {
    return children;
  }
  return <Navigate to={`/login`} replace></Navigate>;
};

export default AdminRoute;
