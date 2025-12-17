import { useEffect, useRef, useState } from "react";
import { api } from "../API/api.ts";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import PlsLogIn from "./PlsLogIn.tsx";
import { FaInfoCircle } from "react-icons/fa"; 

function EcoaportaForm() {
    const [comentarios, setComentarios] = useState("");
    const [longitud, setLongitud] = useState("0");
    const [latitud, setLatitud] = useState("0");
    const [foto, setFoto] = useState<string | null>(null);
    const [tipoDesecho, setTipoDesecho] = useState("Basurero clandestino");
    const [showAuthModal, setShowAuthModal] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false); 

    const videoRef = useRef<HTMLVideoElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (!token) {
            toast.error("Debes iniciar sesión.");
            setShowAuthModal(true);
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

        if (!foto) {
            toast.error("Debes tomar una foto como evidencia.");
            return;
        }

        setIsSubmitting(true); 

        const formData = new FormData();
        formData.append("LocLatitude", latitud);
        formData.append("LocLongitude", longitud);
        formData.append("Description", comentarios);
        formData.append("Category", getCategoriaId(tipoDesecho).toString());

        if (foto) {
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
            
            toast.success("¡Reporte enviado! Tus puntos y monedas se acreditarán tras la revisión.");
            
            setComentarios("");
            setFoto(null);
        } catch (error) {
            console.error(error);
            toast.error("Error al enviar reporte.");
        } finally {
            setIsSubmitting(false);
        }
    };

    if (showAuthModal) {
        return <PlsLogIn />
    }

    return (
        <form
            onSubmit={handleSubmit}
            className="min-h-screen flex flex-col items-center px-4 py-6 pb-24
             bg-gradient-to-br from-[#ffffff] via-[#d1eddf] to-[#ffffff]"
        >
            <h1 className="text-2xl font-bold text-gray-800 mb-4">
                Realiza tu reporte
            </h1>

            {/* ---  MENSAJE DE REVISIÓN Y RECOMPENSAS --- */}
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-6 w-full max-w-md rounded-r-md shadow-sm">
                <div className="flex">
                    <div className="flex-shrink-0">
                        <FaInfoCircle className="h-5 w-5 text-blue-500" />
                    </div>
                    <div className="ml-3">
                        <h3 className="text-sm font-bold text-blue-800">Estado: Pendiente de Revisión</h3>
                        <div className="mt-1 text-xs text-blue-700">
                            <p>Tu reporte será validado por nuestros moderadores.</p>
                            <div className="mt-2 flex items-center gap-2 font-semibold bg-white/50 p-2 rounded w-fit">
                                <span>🎁 Recompensa:</span>
                                <span className="text-green-700">+20 Puntos</span>
                                <span className="text-yellow-600">+5 Ecomonedas</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-sm text-gray-600 mb-4">
                {latitud !== "0" && longitud !== "0" ? (
                    <>Ubicación detectada: {parseFloat(latitud).toFixed(4)}, {parseFloat(longitud).toFixed(4)}</>
                ) : (
                    <>Detectando ubicación...</>
                )}
            </div>

            {/* Cámara */}
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

            {/* Select Tipo de Desecho */}
            <div className="w-full max-w-md mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Tipo de desecho
                </label>
                <select
                    value={tipoDesecho}
                    onChange={(e) => setTipoDesecho(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 bg-white rounded-md shadow-sm focus:ring-green-500 focus:border-green-500"
                >
                    <option>Basurero clandestino</option>
                    <option>Quema de basura</option>
                    <option>Drenaje obstruido</option>
                    <option>Derrame de sustancias peligrosas</option>
                    <option>Otros</option>
                </select>
            </div>

            {/* Textarea Comentarios */}
            <div className="w-full max-w-md mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Comentarios
                </label>
                <textarea
                    rows={4}
                    value={comentarios}
                    onChange={(e) => setComentarios(e.target.value)}
                    placeholder="Datos de relevancia..."
                    className="w-full px-4 py-2 border bg-white border-gray-300 rounded-md shadow-sm resize-none focus:ring-green-500 focus:border-green-500"
                />
            </div>

            <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full max-w-md text-white py-3 rounded-md transition-colors font-medium ${
                    isSubmitting ? "bg-gray-400 cursor-not-allowed" : "bg-green-700 hover:bg-green-800"
                }`}
            >
                {isSubmitting ? "Enviando..." : "Enviar reporte"}
            </button>
        </form>
    );
}

export default EcoaportaForm;