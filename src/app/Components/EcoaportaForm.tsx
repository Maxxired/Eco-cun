import { useEffect, useRef, useState } from "react";
import { api } from "../API/api.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function EcoaportaForm() {
  const [comentarios, setComentarios] = useState("");
  const [longitud, setLongitud] = useState("0");
  const [latitud, setLatitud] = useState("0");
  const [foto, setFoto] = useState<string | null>(null);
  const [tipoDesecho, setTipoDesecho] = useState("Basurero clandestino");

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      toast.error("Debes iniciar sesión.");
      navigate("/opciones");
      return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((s) => {
        if (videoRef.current) videoRef.current.srcObject = s;
      })
      .catch((e) => console.error(e));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (p) => {
          setLatitud(p.coords.latitude.toString());
          setLongitud(p.coords.longitude.toString());
        },
        () => console.warn("Sin ubicación")
      );
    }
  }, [navigate]);

  const tomarFoto = () => {
    if (videoRef.current && canvasRef.current) {
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;
      canvasRef.current.getContext("2d")?.drawImage(videoRef.current, 0, 0);
      setFoto(canvasRef.current.toDataURL("image/png"));
    }
  };

  const getCategoriaId = (t: string) => {
    const map: any = {
      "Basurero clandestino": 0,
      "Quema de basura": 1,
      "Drenaje obstruido": 2,
      "Derrame de sustancias peligrosas": 3,
    };
    return map[t] ?? 4;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("LocLatitude", latitud);
    formData.append("LocLongitude", longitud);
    formData.append("Description", comentarios);
    formData.append("Category", getCategoriaId(tipoDesecho).toString());

    if (foto) {
      // convertir base64 a Blob
      const byteString = atob(foto.split(",")[1]);
      const mimeString = foto.split(",")[0].split(":")[1].split(";")[0];
      const ab = new ArrayBuffer(byteString.length);
      const ia = new Uint8Array(ab);
      for (let i = 0; i < byteString.length; i++) {
        ia[i] = byteString.charCodeAt(i);
      }
      const blob = new Blob([ab], { type: mimeString });
      formData.append("Image", blob, "evidencia.png");
    }

    try {
      await api.post("/api/reports/createreport", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("Reporte enviado correctamente");
      setComentarios("");
      setFoto(null);
    } catch (error) {
      console.error(error);
      toast.error("Error al enviar reporte.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col items-center bg-white px-4 py-6 pb-24"
    >
      {/* Título estilo anterior */}
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Realiza tu reporte
      </h1>

      <div className="text-sm text-gray-600 mb-4">
        Ubicación detectada: {parseFloat(latitud).toFixed(4)},{" "}
        {parseFloat(longitud).toFixed(4)}
      </div>

      {/* Cámara limpia */}
      <div className="w-full max-w-md mb-4">
        <video
          ref={videoRef}
          autoPlay
          className="rounded-md shadow-sm w-full border border-gray-200"
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

      {foto && (
        <img
          src={foto}
          alt="Evidencia"
          className="w-full max-w-md mb-4 rounded-md shadow-sm border border-gray-200"
        />
      )}

      {/* Select estilo clásico */}
      <div className="w-full max-w-md mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Tipo de desecho
        </label>
        <select
          value={tipoDesecho}
          onChange={(e) => setTipoDesecho(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
        >
          <option>Basurero clandestino</option>
          <option>Quema de basura</option>
          <option>Drenaje obstruido</option>
          <option>Derrame de sustancias peligrosas</option>
          <option>Otros</option>
        </select>
      </div>

      {/* Textarea estilo clásico */}
      <div className="w-full max-w-md mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Comentarios
        </label>
        <textarea
          rows={4}
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          placeholder="Datos de relevancia..."
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm resize-none focus:ring-green-500 focus:border-green-500"
        />
      </div>

      <button
        type="submit"
        className="w-full max-w-md bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors font-medium"
      >
        Enviar reporte
      </button>
    </form>
  );
}

export default EcoaportaForm;
