import type { RouteObject } from "react-router-dom";
import Home from "../pages/Home/Home";
import MapView from "../pages/Maps/Map";
import Campaigns from "../pages/Campaigns/campaigns";
import OptionsView from '../pages/Options/OptionsView.tsx';
export const HomeRoutes: RouteObject[] = [
    {
        index: true,
        element: <Home />
    },
    {
        path: "/maps",
        element: <MapView />

    },
    {
        path: "/campaings",
        element: <Campaigns />

    },
    {
        path: 'opciones',
        element: <OptionsView />,
    },
]