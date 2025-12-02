import { api } from "../../API/api.ts";
import "leaflet/dist/leaflet.css";
// Asegúrate de que este archivo CSS tenga height: 100% o una altura fija
import styles from "./styles/Map.module.css"; 
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import { useLocation } from "react-router-dom";
// 1. Importamos Framer Motion
import { motion } from "framer-motion";
import { FaMapMarkedAlt } from "react-icons/fa";

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
  latitude: number;
  longitude: number;
  acceptedMaterials: string[];
  address: string;
  openingTime: string;
  closingTime: string;
}

// Icono para Centros de Acopio (Verde)
const centerIcon = new L.Icon({
  iconUrl: 'https://cdn-icons-png.flaticon.com/512/684/684908.png', 
  iconSize: [35, 35],
  iconAnchor: [17, 35],
  popupAnchor: [0, -35]
});

const cancunPosition: [number, number] = [21.1619, -86.8515];

const MapView: React.FC = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const [centros, setCentros] = useState<CentroAcopio[]>([]); // Agregué el estado por si lo usas
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
        if (resReports.data?.data) setReportes(resReports.data.data);

        // 2. Cargar Centros de Acopio (Si tienes el endpoint)
        /* const resCentros = await api.get("/api/CollectionCenters"); 
        if(resCentros.data) setCentros(resCentros.data);
        */

      } catch (error) {
        console.error(error);
        // Eliminé el toast de error como pediste implícitamente
      }
    };

    fetchData();
  }, []);

  return (
    // Usamos un contenedor relativo para posicionar el título encima
    <div className="relative w-full h-[calc(100vh-80px)]">
      
      {/* --- TÍTULO FLOTANTE CON FRAMER MOTION --- */}
      <motion.div 
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="absolute top-4 left-4 right-4 z-[1000] bg-white/90 backdrop-blur-sm p-4 rounded-2xl shadow-lg border border-green-100"
      >
        <div className="flex items-center gap-3">
          <div className="bg-green-100 p-2 rounded-full text-green-600">
            <FaMapMarkedAlt size={20} />
          </div>
          <div>
            <h1 className="text-lg font-bold text-gray-800 leading-tight">Mapa Ecológico</h1>
            <p className="text-xs text-gray-500">Explora reportes.</p>
          </div>
        </div>
      </motion.div>

    
      <MapContainer
        center={targetLat && targetLng ? [targetLat, targetLng] : cancunPosition}
        zoom={targetLat ? 16 : 12}
        className={styles.mapContainer} 
        key={targetLat ? `${targetLat}-${targetLng}` : "default-map"}
        style={{ height: "100%", width: "100%", zIndex: 0 }} 
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; OpenStreetMap contributors'
        />

        {/* Marcadores de Reportes */}
        {reportes.map((r) => (
          <Marker key={`rep-${r.id}`} position={[r.locLatitude, r.locLongitude]}>
            <Popup>
              <div className="p-1">
                <h3 className="font-bold text-sm mb-1 text-red-600">Reporte: {r.category}</h3>
                <p className="text-xs mb-2 text-gray-600">{r.description}</p>
                {r.imageUrl && (
                  <img src={getImageUrl(r.imageUrl) || ''} className="rounded-md w-32 h-20 object-cover" alt="Evidencia" />
                )}
              </div>
            </Popup>
          </Marker>
        ))}

        {/* Marcadores de Centros de Acopio */}
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
    </div>
  );
};

export default MapView;