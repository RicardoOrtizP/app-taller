import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { OnlyPublicRoute } from "./OnlyPublicRoute";
import { AuthLayout } from "../layouts/AuthLayout";
import { UnauthorizedPage } from "../pages/UnauthorizedPage";
import { NotFoundPage } from "../pages/NotFoundPage";
import { LoginPage } from "../feature/auth/pages/LoginPage";
import { RegisterPage } from "../feature/auth/pages/RegisterPage";
import { AppLayout } from "../layouts/AppLayout";
import { UsersPage } from "../feature/users/pages/UsersPage";

export const AppRoutes = () => {
  return (
    <Suspense fallback={<>Cargando...</>}>
      <Routes>
        {/* 1. Rutas publicas */}
        <Route path="/about" element={<>About</>} />

        <Route element={<AppLayout />}>
          <Route path="/" element={<>Home</>} />
          <Route path="/profile" element={<>Profile page</>} />
          <Route path="/dashboard" element={<>Dashboard</>} />
          <Route path="/today" element={<>Today</>} />
          <Route path="/orders" element={<>Pedidos</>} />
          <Route path="/history" element={<>Historial</>} />
          <Route path="/clients" element={<>Clientes</>} />
          <Route path="/users" element={<UsersPage />} />
          <Route path="/catalog" element={<>Catalog</>} />
          <Route path="/boards" element={<>Tablero</>} />
        </Route>

        {/* 2. Rutas de solo visitantes (unauthorized) */}
        <Route
          element={
            <OnlyPublicRoute>
              <AuthLayout />
            </OnlyPublicRoute>
          }
        >
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Rutas de error y fallback 404, 403 */}
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="/404" element={<NotFoundPage />} />
        <Route path="*" element={<Navigate to="/404" replace />} />
      </Routes>
    </Suspense>
  );
};
