import { useEffect, useRef, useState } from "react";

function EcoaportaForm() {
  const [comentarios, setComentarios] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const [longitud, setLongitud] = useState("");
  const [latitud, setLatitud] = useState("");
  const [foto, setFoto] = useState<string | null>(null);

  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Activar cámara al montar
  useEffect(() => {
    navigator.mediaDevices
      .getUserMedia({ video: true })
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const datosReporte = {
      comentarios,
      anonimo,
      longitud,
      latitud,
      foto,
    };

    console.log("Reporte enviado:", datosReporte);

    // Limpiar formulario
    setComentarios("");
    setAnonimo(false);
    setFoto(null);
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6"
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

      {/* Checkbox de anonimato */}
      <div className="w-full max-w-md flex items-center mb-6">
        <input
          type="checkbox"
          id="anonimo"
          checked={anonimo}
          onChange={(e) => setAnonimo(e.target.checked)}
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <label htmlFor="anonimo" className="ml-2 text-sm text-gray-700">
          Reporte anónimo
        </label>
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
