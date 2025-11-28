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
// 1. Importar useLocation para leer las coordenadas que nos mandan
import { useLocation } from "react-router-dom"; 

const API_URL = "http://localhost:5093"; // Asegúrate de que este puerto sea el correcto

interface Reporte {
  id: number;
  userID: number;
  locLatitude: number;
  locLongitude: number;
  description: string;
  category: string;
  status: string;
  createdAt: string;
  updatedAt?: string | null;
  imageUrl?: string | null;
}

const cancunPosition: [number, number] = [21.1619, -86.8515];

const MapView: React.FC = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);
  const location = useLocation();
  
  // 2. Leer coordenadas del estado de navegación (si venimos del modal)
  const targetLat = location.state?.targetLat;
  const targetLng = location.state?.targetLng;

  // Helper para imagen (igual que en ReportsView)
  const getImageUrl = (path?: string | null) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${API_URL}${path}`;
  };

  useEffect(() => {
    // Configurar íconos de Leaflet
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    const fetchReportes = async () => {
      try {
        const token = localStorage.getItem('token');
        
        // 3. Usamos la ruta correcta y pasamos el token si es necesario
        const response = await api.get("/api/reports/allreports", {
          params: { page: 1, limit: 100 },
          headers: token ? { Authorization: `Bearer ${token}` } : {}
        });

        if(response.data && response.data.data) {
           setReportes(response.data.data);
           // toast.success("Reportes cargados en el mapa"); // Opcional: quitar para no molestar
        }
      } catch (error) {
        console.error("Error al cargar reportes:", error);
        toast.error("Error al cargar los puntos del mapa");
      }
    };

    fetchReportes();
  }, []);

  return (
    <MapContainer
      // 4. Centrar el mapa en el reporte seleccionado O en Cancún
      center={targetLat && targetLng ? [targetLat, targetLng] : cancunPosition}
      zoom={targetLat ? 16 : 13} // Zoom más cerca si vamos a un reporte específico
      className={styles.mapContainer}
      // Usamos key para forzar re-render si cambian las coordenadas objetivo
      key={targetLat ? `${targetLat}-${targetLng}` : "default-map"}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; OpenStreetMap contributors'
      />

      {reportes.map((r) => (
        <Marker key={r.id} position={[r.locLatitude, r.locLongitude]}>
          <Popup>
            <div className="p-1">
                <h3 className="font-bold text-sm mb-1 text-green-700">{r.category}</h3>
                <p className="text-xs mb-2 text-gray-600">{r.description}</p>
                {r.imageUrl && (
                  <img
                    // 5. Usar el helper para la imagen correcta
                    src={getImageUrl(r.imageUrl) || ''}
                    alt="Evidencia"
                    className="rounded-md w-full h-24 object-cover border border-gray-200"
                  />
                )}
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;