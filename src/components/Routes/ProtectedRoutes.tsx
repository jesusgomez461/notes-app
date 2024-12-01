import { Navigate, Outlet } from "react-router-dom";
import { PropsProtectedRoute } from "./ProtectedRoute.interface";

export const ProtectedRoute = ({
  isAllowed,
  children,
  redirectTo = "/login",
}: PropsProtectedRoute) => {
  if (isAllowed) return children ? children : <Outlet />;
  return <Navigate to={redirectTo} replace />;
};
