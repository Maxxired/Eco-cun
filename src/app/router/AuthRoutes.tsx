import type { RouteObject } from "react-router-dom";
import Login from "../pages/Auth/LoginView";
import Register from "../pages/Auth/RegisterView";

export const AuthRoutes: RouteObject[] = [
    {
        path: "/login",
        element: <Login />
    },
    {
        path: "/register",
        element: <Register />
    },
]