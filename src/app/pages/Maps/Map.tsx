import { api } from "../../API/api.ts";
import "leaflet/dist/leaflet.css";
import styles from "./styles/Map.module.css"; // Importar estilos locales
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";
import { toast } from "react-hot-toast";
import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

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

// Coordenadas de Cancún [latitud, longitud]
const cancunPosition: [number, number] = [21.1619, -86.8515];

const MapView: React.FC = () => {
  const [reportes, setReportes] = useState<Reporte[]>([]);

  useEffect(() => {
    // Configurar íconos
    delete (L.Icon.Default.prototype as any)._getIconUrl;
    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });

    // Función asíncrona para cargar reportes
    const fetchReportes = async () => {
      try {
        const response = await api.get("/api/Reports", {
          params: {
            page: 1,
            limit: 100,
          },
        });

        setReportes(response.data.data);
      } catch (error) {
        console.error("Error al cargar reportes:", error);
        toast.error("No se pudieron cargar los reportes");
      }
    };

    fetchReportes();
  }, []);

  return (
    <MapContainer
      center={cancunPosition}
      zoom={13}
      className={styles.mapContainer}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />

      {reportes.map((r) => (
        <Marker key={r.id} position={[r.locLatitude, r.locLongitude]}>
          <Popup>
            <h3 className="font-bold">{r.category}</h3>
            <p>{r.description}</p>
            {r.imageUrl && (
              <img
                src={`http://localhost:5093${r.imageUrl}`}
                alt={r.description}
                className="mt-2 rounded-md w-40"
              />
            )}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default MapView;
