import { Outlet, Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import Spinner from "../components/Spinner";

const RequireAuth = () => {
  const { auth, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) return <Spinner />;

  return auth?.username ? (
    <Outlet />
  ) : (
    <Navigate to="/login" state={{ from: location }} replace />
  );
};

export default RequireAuth;
