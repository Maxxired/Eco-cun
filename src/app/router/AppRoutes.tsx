import React from "react";
import { Navigate, RouteObject, useRoutes } from "react-router-dom";
import NotResults from "../pages/not-found/NotResults.tsx";
import { HomeRoutes } from "./HomeRoutes.tsx";
import Layout from "../layout/Layout.tsx";

const AppRoutes: React.FC = () => {
    const routes: RouteObject[] = [
        {
            path: "/",
            element: <Layout />,
            children: [
                ...HomeRoutes
            ]
        },
        {
            path: 'not-found',
            element: <NotResults />,
        },
        {
            path: '*',
            element: <Navigate to="/not-found" replace />,
        },
    ];

    return useRoutes(routes);

}

export default AppRoutes;