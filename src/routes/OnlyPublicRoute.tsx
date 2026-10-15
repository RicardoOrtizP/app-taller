import type React from "react";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { Navigate } from "react-router-dom";

interface OnlyPublicRouteProps {
  children: React.ReactNode;
}
export const OnlyPublicRoute = ({ children }: OnlyPublicRouteProps) => {
  const isLoading = false;
  const isAuthenticated = false;
  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }
  return <>{children}</>;
};
