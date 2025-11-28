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
        navigate("/opciones"); 
        return;
    }

    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: "environment" } })
      .then((stream) => {
        if (videoRef.current) {
          videoRef.current.srcObject = stream;
        }
      })
      .catch((err) => console.error(err));

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitud(position.coords.latitude.toString());
          setLongitud(position.coords.longitude.toString());
        },
        (error) => console.warn(error),
        { enableHighAccuracy: true }
      );
    }
  }, [navigate]);

  const tomarFoto = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (video && canvas) {
      const ctx = canvas.getContext("2d");
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      ctx?.drawImage(video, 0, 0, canvas.width, canvas.height);
      setFoto(canvas.toDataURL("image/png"));
    }
  };

  const getCategoriaId = (tipo: string): number => {
    switch (tipo) {
      case "Basurero clandestino": return 0;
      case "Quema de basura": return 1;
      case "Drenaje obstruido": return 2;
      case "Derrame de sustancias peligrosas": return 3;
      default: return 4; 
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // CREAMOS EL JSON (NO FORMDATA)
    const payload = {
        LocLatitude: parseFloat(latitud),
        LocLongitude: parseFloat(longitud),
        Description: comentarios,
        Category: getCategoriaId(tipoDesecho),
        Image: null // Se va null porque [FromBody] no soporta archivos
    };

    try {
      // CORRECCIÓN DE URL: /api/Reports/CreateReport
      const response = await api.post("/api/Reports/CreateReport", payload);
      
      toast.success("Reporte enviado correctamente");
      console.log("Respuesta:", response.data);
      setComentarios("");
      setFoto(null);

    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Error al enviar el reporte.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6 pb-20">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Realiza tu reporte</h1>
      {/* ... (El resto de tu JSX sigue igual: video, select, textarea) ... */}
      
      <div className="w-full max-w-md mb-4">
        <video ref={videoRef} autoPlay className="rounded-md shadow-md w-full" />
        <button type="button" onClick={tomarFoto} className="mt-2 w-full bg-green-700 text-white py-2 rounded-md">Tomar foto</button>
        <canvas ref={canvasRef} className="hidden" />
      </div>

      {foto && <img src={foto} alt="Captura" className="w-full max-w-md mb-4 rounded-md" />}

      <div className="w-full max-w-md mb-4">
        <select value={tipoDesecho} onChange={(e) => setTipoDesecho(e.target.value)} className="w-full px-4 py-2 border rounded-md">
          <option>Basurero clandestino</option>
          <option>Quema de basura</option>
          <option>Drenaje obstruido</option>
          <option>Derrame de sustancias peligrosas</option>
          <option>Otros</option>
        </select>
      </div>

      <div className="w-full max-w-md mb-4">
        <textarea rows={4} value={comentarios} onChange={(e) => setComentarios(e.target.value)} placeholder="Comentarios..." className="w-full px-4 py-2 border rounded-md" />
      </div>

      <button type="submit" className="w-full max-w-md bg-green-700 text-white py-2 rounded-md">Enviar reporte</button>
    </form>
  );
}

export default EcoaportaForm;