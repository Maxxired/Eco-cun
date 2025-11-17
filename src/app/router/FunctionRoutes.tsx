import type { RouteObject } from "react-router-dom";

// --- IMPORTA TODAS TUS VISTAS AQUÍ ---
import EcoaportaForm from "../Components/EcoaportaForm";
import MapView from "../pages/Maps/Map";
import Campaigns from "../pages/Campaigns/campaigns";
import OptionsView from '../pages/Options/OptionsView';
import ReportsView from '../pages/Reports/ReportsView'; 
import AdminProfileView from '../pages/Admin/AdminProfileView';



export const FunctionRoutes: RouteObject[] = [
  {
    path: "ecoaporta",
    element: <EcoaportaForm />,
  },
  {
    path: "Maps",
    element: <MapView />,
  },
    {
    path: "/campaings",
        element: <Campaigns />

    },
    {
    path: 'admin-profile', 
    element: <AdminProfileView />,
  },
  {
    path: "/campaings",
    element: <Campaigns />,
  },
  {
    path: "/opciones",
    element: <OptionsView />,
  },

  {
    path: "mis-reportes",
    element: <ReportsView />,
  },
  {
    path: "reportes/:folioId",
    element: <div>Aquí va el detalle del reporte</div>,
  },
];
