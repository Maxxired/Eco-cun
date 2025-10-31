import 'leaflet/dist/leaflet.css';
import styles from './Map.module.css'; // Importar estilos locales
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';

// Coordenadas de Cancún [latitud, longitud]
const cancunPosition: [number, number] = [21.1619, -86.8515];

const Map2: React.FC = () => {
  useEffect(() => {
    // Arreglo para el ícono del marcador (importante para Webpack/React)
    // Esto evita que se intente buscar una URL de ícono incorrecta.
    delete (L.Icon.Default.prototype as any)._getIconUrl;

    L.Icon.Default.mergeOptions({
      iconRetinaUrl: markerIcon2x,
      iconUrl: markerIcon,
      shadowUrl: markerShadow,
    });
  }, []);

  return (
    <MapContainer 
      center={cancunPosition} 
      zoom={13} // Un buen nivel de zoom para ver la ciudad
      className={styles.mapContainer} // Usar clase de CSS Modules
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={cancunPosition}>
        <Popup>
          ¡Saludos desde Cancún!
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map2;

