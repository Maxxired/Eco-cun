import type { RouteObject } from "react-router-dom";

// --- IMPORTA TODAS TUS VISTAS AQUÍ ---
import EcoaportaForm from "../Components/EcoaportaForm";
import MapView from "../pages/Maps/Map";
import Campaigns from "../pages/Campaigns/campaigns";
import OptionsView from '../pages/Options/OptionsView';
import ReportsView from '../pages/Reports/ReportsView'; // La de reportes

export const FunctionRoutes: RouteObject[] = [
  // --- Tu ruta EcoAporta ---
  {
    path: "ecoaporta",
    element: <EcoaportaForm />,
  },

  // --- Las rutas que movimos de HomeRoutes ---
  {
    // SIN EL '/' y corregido
    path: "mapa",
    element: <MapView />
  },
  {
    // SIN EL '/' y corregido
    path: "campanas",
    element: <Campaigns />
  },
  {
    // SIN EL '/'
    path: 'opciones',
    element: <OptionsView />,
  },

  // --- Las nuevas de reportes ---
  {
    path: 'mis-reportes',
    element: <ReportsView />,
  },
  {
    path: 'reportes/:folioId',
    element: <div>Aquí va el detalle del reporte</div>
  },
];