import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import PublicOnlyRoute from "./PublicOnlyRoute";

import React from "react";
import NotFoundPage from "@/pages/NotFoundPage";

import { routes } from "./routes";

const AppRoutes = () => {
  return (
    <Routes>
      {/* Public Routes */}
      {routes.public.map((route, index) => (
        <Route key={index} path={route.path} element={route.element} />
      ))}

      {/* Protected Routes */}
      {routes.protected.map((route, index) => (
        <Route
          key={`protected-${index}`}
          path={route.path}
          element={<ProtectedRoute>{route.element}</ProtectedRoute>}
        />
      ))}

      {/* Redirects */}
      {routes.redirects.map((redirect, index) => (
        <Route
          key={`redirect-${index}`}
          path={redirect.from}
          element={<Navigate to={redirect.to} replace />}
        />
      ))}

      {/* 404 - Not Found Route */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

export default AppRoutes;
