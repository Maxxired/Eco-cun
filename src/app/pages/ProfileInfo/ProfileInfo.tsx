import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    FaArrowLeft,
    FaCamera,
    FaPen,
    FaEnvelope,
    FaPhone,
    FaBirthdayCake,
    FaUser,
    FaVenusMars
} from "react-icons/fa";
import { api } from "../../API/api";
import toast from "react-hot-toast";
interface UserData {
    userId: string;
    name: string;
    email: string;
    role: string;
    phone?: string;
    gender?: string;
    birthDate?: string;
}

const ProfileInfo: React.FC = () => {
    const [user, setUser] = useState<UserData | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await api.get("/api/user/profile");
                if (response.data) {
                    setUser(response.data);
                }
            } catch (error) {
                console.error("Error al cargar perfil", error);
                toast.error("No se pudo cargar la información");
            } finally {
                setIsLoading(false);
            }
        };
        fetchProfile();
    }, []);

    if (isLoading) {
        return <div className="min-h-screen flex items-center justify-center bg-gray-50 text-green-700">Cargando perfil...</div>;
    }

    if (!user) {
        return <div className="min-h-screen flex items-center justify-center">Error: No se encontraron datos.</div>;
    }

    const formatDate = (dateString?: string) => {
        if (!dateString) return "No especificada";
        return new Date(dateString).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' });
    };

    return (
        <div className="min-h-screen bg-gray-100 pb-10">

            {/* ---  PORTADA --- */}
            <div className="relative h-48 md:h-64 bg-gray-300 overflow-hidden">
                <img
                    src="/MonkeyDevs.jpg.jpeg"
                    alt="Monkeys"
                    className="w-full h-70 object-cover opacity-180"
                />
                <Link to="/" className="absolute top-4 left-4 bg-black/30 p-2 rounded-full text-white hover:bg-black/50 transition">
                    <FaArrowLeft />
                </Link>
            </div>

            {/* ---  FOTO Y NOMBRE --- */}
            <div className="relative px-4 mb-4">
                <div className="-mt-16 flex flex-col items-center">
                    <div className="relative">
                        <div className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white bg-white shadow-md overflow-hidden flex items-center justify-center">
                            <FaUser className="text-gray-300 text-6xl" />
                        </div>
                        <button className="absolute bottom-2 right-2 bg-gray-200 p-2 rounded-full text-gray-700 hover:bg-gray-300 border-2 border-white">
                            <FaCamera size={14} />
                        </button>
                    </div>

                    <h1 className="text-2xl font-bold text-gray-900 mt-3 text-center">
                        {user.name}
                    </h1>
                    <p className="text-green-600 font-medium text-sm">
                        {user.role === 'Citizen' ? 'Ciudadano Verificado' : user.role}
                    </p>
                </div>
            </div>

            {/* ---  DATOS --- */}
            <div className="max-w-2xl mx-auto px-4 space-y-4">

                {/* Contacto */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Información de Contacto</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-700">
                            <FaEnvelope className="text-gray-400 text-xl" />
                            <div>
                                <p className="text-xs text-gray-400 uppercase">Correo</p>
                                <p className="font-medium">{user.email}</p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                            <FaPhone className="text-gray-400 text-xl" />
                            <div>
                                <p className="text-xs text-gray-400 uppercase">Teléfono</p>
                                {user.phone ? <p className="font-medium">{user.phone}</p> : <p className="text-gray-400 italic text-sm">Agregar número</p>}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Info Básica */}
                <div className="bg-white rounded-xl shadow-sm p-5 border border-gray-100">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-bold text-gray-800">Información Básica</h3>
                    </div>
                    <div className="space-y-4">
                        <div className="flex items-center gap-3 text-gray-700">
                            <FaVenusMars className="text-gray-400 text-xl" />
                            <div>
                                <p className="text-xs text-gray-400 uppercase">Género</p>
                                {user.gender ? <p className="font-medium">{user.gender}</p> : <p className="text-gray-400 italic text-sm">Agregar género</p>}
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-gray-700">
                            <FaBirthdayCake className="text-gray-400 text-xl" />
                            <div>
                                <p className="text-xs text-gray-400 uppercase">Fecha de Nacimiento</p>
                                {user.birthDate ? <p className="font-medium">{formatDate(user.birthDate)}</p> : <p className="text-gray-400 italic text-sm">Agregar fecha</p>}
                            </div>
                        </div>
                    </div>
                </div>
                                    <div className="flex gap-3 mt-4 w-full max-w-sm">
                        <button className="flex-1 bg-[#1a7f4c] text-white py-2 rounded-lg font-bold shadow-sm hover:bg-[#146c3e] flex items-center justify-center gap-2">
                            <FaPen size={14} /> Editar Perfil
                        </button>
                    </div>

            </div>
        </div>
    );
};

export default ProfileInfo;