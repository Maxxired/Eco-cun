import type { RouteObject } from "react-router-dom";
import EcoaportaForm from "../Components/EcoaportaForm";

export const FunctionRoutes: RouteObject[] = [
  {
    path: "/ecoaporta",
    element: <EcoaportaForm />,
  },
];
