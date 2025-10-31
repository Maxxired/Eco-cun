import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home/Home";
import MapView from "../pages/Maps/Map";

export const HomeRoutes: RouteObject[] = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "/maps",
        element: <MapView />
    }
]