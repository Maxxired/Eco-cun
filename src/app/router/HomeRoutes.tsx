import type { RouteObject } from "react-router-dom";
import Home from "../../features/Home/Home.tsx";

export const HomeRoutes: RouteObject[] = [
    {
        index: true,
        element: <Home />
    }
]