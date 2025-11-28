import { api } from "../../API/api.ts";
import "leaflet/dist/leaflet.css";
import styles from "./styles/Map.module.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useLocation } from "react-router-dom"; 

const API_URL = "http://localhost:5093";

// Interfaces
interface Reporte {
  id: number;
  locLatitude: number;
  locLongitude: number;
  description: string;
  category: string;
  imageUrl?: string | null;
}

interface CentroAcopio {
  id: number;
  name: string;
  latitude: number; // Asegúrate de que tu DB ya tenga estas columnas
  longitude: number;
  acceptedMaterials: string[];
  address: string;
  openingTime: string;
  closingTime: string;
}

// Icono para Centros de Acopio (Verde)
const centerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', // Icono reciclaje
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

const cancunPosition: [number, number] = [21.1619, -86.8515];

const MapView: React.FC = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [centros, setCentros] = useState<CentroAcopio[]>([]); // Nuevo estado
  const location = useLocation();
  
  const targetLat = location.state?.targetLat;
  const targetLng = location.state?.targetLng;

  const getImageUrl = (path?: string | null) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${API_URL}${path}`;
  };

  useEffect(() => {
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        const headers = token ? { Authorization: `Bearer ${token}` } : {};

        // 1. Cargar Reportes
        const resReports = await api.get("/api/reports/allreports", {
          params: { page: 1, limit: 100 },
          headers
        });
        if(resReports.data?.data) setReportes(resReports.data.data);

        // 2. Cargar Centros de Acopio
        // Asegúrate de tener este endpoint en tu backend, si no, solo se mostrarán reportes
        const resCentros = await api.get("/api/CollectionCenters"); 
        if(resCentros.data) setCentros(resCentros.data);

      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <MapContainer
      center={targetLat && targetLng ? [targetLat, targetLng] : cancunPosition}
      zoom={targetLat ? 16 : 12}
      className={styles.mapContainer}
      key={targetLat ? `${targetLat}-${targetLng}` : "default-map"}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {/* Marcadores de Reportes (Azules Default) */}
      {reportes.map((r) => (
        <Marker key={`rep-${r.id}`} position={[r.locLatitude, r.locLongitude]}>
          <Popup>
            <div className="p-1">
                <h3 className="font-bold text-sm mb-1 text-red-600">Reporte: {r.category}</h3>
                <p className="text-xs mb-2 text-gray-600">{r.description}</p>
                {r.imageUrl && (
                  <img src={getImageUrl(r.imageUrl) || ''} className="rounded-md w-32 h-20 object-cover" />
                )}
            </div>
          </Popup>
        </Marker>
      ))}

      {/* Marcadores de Centros de Acopio (Verdes) */}
      {centros.map((c) => (
        <Marker key={`center-${c.id}`} position={[c.latitude, c.longitude]} icon={centerIcon}>
          <Popup>
            <div className="p-1">
                <h3 className="font-bold text-sm mb-1 text-green-700">{c.name}</h3>
                <p className="text-xs text-gray-500">{c.address}</p>
                <p className="text-xs font-semibold mt-1">Materiales:</p>
                <p className="text-xs text-gray-600">{c.acceptedMaterials.join(", ")}</p>
                <p className="text-xs mt-1 text-blue-600">{c.openingTime} - {c.closingTime}</p>
            </div>
          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
};

export default MapView;