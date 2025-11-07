import { useEffect, useState } from "react";

const UbicacionActual = () => {
  const [posicion, setPosicion] = useState<{ lat: number; lng: number } | null>(
    null
  );
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setPosicion({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (err) => {
          setError("No se pudo obtener la ubicación: " + err.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    } else {
      setError("Geolocalización no soportada en este navegador.");
    }
  }, []);

  return (
    <div className="p-4">
      {posicion ? (
        <p className="text-green-700">
          Latitud: {posicion.lat}, Longitud: {posicion.lng}
        </p>
      ) : (
        <p className="text-gray-600">{error || "Obteniendo ubicación..."}</p>
      )}
    </div>
  );
};

export default UbicacionActual;
