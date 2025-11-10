 import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home/Home";

export const HomeRoutes: RouteObject[] = [
    {
        index: true,
        element: <Home />
    },
];
