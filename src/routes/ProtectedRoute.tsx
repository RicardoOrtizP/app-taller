import { Navigate, Outlet, useLocation } from "react-router-dom";

export const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return <>Cargando...</>;
  }
  // Validar autenticación
  if (!isAuthenticated) {
    // Redirigir a login guardando la ubicación original
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  // Validar roles (opcional)
  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  // Renderiza directamente el hijo
  return children;
};
