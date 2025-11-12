import { useEffect, useRef, useState } from "react";
import { api } from "../API/api.ts";

function EcoaportaForm() {
  const [comentarios, setComentarios] = useState("");
  const [longitud, setLongitud] = useState("");
  const [latitud, setLatitud] = useState("");
  const [foto, setFoto] = useState<string | null>(null);
  const [tipoDesecho, setTipoDesecho] = useState("Basurero clandestino");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Activar cámara trasera
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => {
        console.error("Error al acceder a la cámara:", err);
      });

    // Obtener ubicación
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude.toString());
          setLongitud(position.coords.longitude.toString());
        },
        (error) => {
          console.warn("Ubicación no autorizada:", error.message);
        },
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 0,
        }
      );
    }
  }, []);

  const tomarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      const dataUrl = canvas.toDataURL("image/png");
      setFoto(dataUrl);
    }
  };

  //Convertir de base64 a Blob para una mejor gestion
  const base64ToBlob = (base64: string) => {
    const byteString = atob(base64.split(",")[1]);
    const mimeString = base64.split(",")[0].split(":")[1].split(";")[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    return new Blob([ab], { type: mimeString });
  };

  const getCategoriaId = (tipo: string): number => {
    switch (tipo) {
      case "Basurero clandestino":
        return 1;
      case "Quema de basura":
        return 2;
      case "Drenaje obstruido":
        return 3;
      case "Derrame de sustancias peligrosas":
        return 4;
      case "Otros":
        return 5;
      default:
        return 0;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("LocLatitude", latitud);
    formData.append("LocLongitude", longitud);
    formData.append("Description", comentarios);
    formData.append("Category", getCategoriaId(tipoDesecho).toString());

    if (foto) {
      const blob = base64ToBlob(foto);
      formData.append("Image", blob, "foto.png");
    }

    try {
      const response = await api.post("/api/Reports", formData);
      console.log("Reporte enviado:", response.data);
    } catch (error) {
      console.error("Error al enviar reporte:", error);
    }

    // Limpiar formulario
    setComentarios("");
    setFoto(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6 pb-20"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Realiza tu reporte
      </h1>

      {/* Vista previa de ubicación */}
      <div className="text-sm text-gray-600 mb-4">
        Ubicación detectada:{" "}
        {latitud && longitud ? `${latitud}, ${longitud}` : "Obteniendo..."}
      </div>

      {/* Cámara */}
      <div className="w-full max-w-md mb-4">
        <video
          ref={videoRef}
          autoPlay
          className="rounded-md shadow-md w-full"
        />
        <button
          type="button"
          onClick={tomarFoto}
          className="mt-2 w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
        >
          Tomar foto
        </button>
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {/* Vista previa de la foto */}
      {foto && (
        <div className="w-full max-w-md mb-4">
          <p className="text-sm text-gray-600 mb-1">Foto capturada:</p>
          <img
            src={foto}
            alt="Captura"
            className="rounded-md shadow-md w-full"
          />
        </div>
      )}

      {/* Menú de tipo de desecho */}
      <div className="w-full max-w-md mb-4">
        <label
          htmlFor="tipoDesecho"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Tipo de desecho
        </label>
        <select
          id="tipoDesecho"
          value={tipoDesecho}
          onChange={(e) => setTipoDesecho(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
        >
          <option value="Basurero clandestino">Basurero clandestino</option>
          <option value="Desechos peligrosos">Desechos peligrosos</option>
          <option value="Quema de residuos">Quema de residuos</option>
          <option value="Drenaje obstruido">Drenaje obstruido</option>
          <option value="Otros">Otros</option>
        </select>
      </div>

      {/* Comentarios */}
      <div className="w-full max-w-md mb-4">
        <label
          htmlFor="comentarios"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Comentarios
        </label>
        <textarea
          id="comentarios"
          rows={4}
          placeholder="Datos de relevancia para proceder."
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 resize-none"
        />
      </div>

      {/* Botón Enviar */}
      <button
        type="submit"
        className="w-full max-w-md bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
      >
        Enviar reporte
      </button>
    </form>
  );
}

export default EcoaportaForm;
