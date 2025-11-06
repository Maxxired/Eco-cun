import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import NotResults from "../pages/not-found/NotResults.tsx";
import { HomeRoutes } from "./HomeRoutes.tsx";
import Layout from "../layout/Layout.tsx";
import { AuthRoutes } from "./AuthRoutes.tsx";
import { FunctionRoutes } from "./FunctionRoutes.tsx";

const AppRoutes: React.FC = () => {
  const routes: RouteObject[] = [
    {
      path: "/",
      element: <Layout />,
      children: [...HomeRoutes, ...AuthRoutes, ...FunctionRoutes],
    },
    {
      path: "not-found",
      element: <NotResults />,
    },
    {
      path: "*",
      element: <Navigate to="/not-found" replace />,
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
