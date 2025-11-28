import React from 'react';
import { Link } from 'react-router-dom';

import {
    FaUserCog,      // Icono para "Administrador"
    FaFileAlt,      // Icono para "Gestion de Reportes"
    FaCog,          // Icono para "Configuración"
    FaSignOutAlt,   // Icono para "Cerrar Sesión"
    FaChevronRight  // Icono de la flecha
} from 'react-icons/fa';

const monkeyLogo = "/monkeydev_logo_blanco_slogan.png";

const AdminProfileView: React.FC = () => {
    return (
        <div className="min-h-screen bg-gray-10 pb-20 flex flex-col">
            <main className="p-4 flex-grow">

                {/*Tarjeta "Administrador"*/}
                <div className="bg-gray-200 rounded-xl p-6 flex flex-col items-center justify-center mb-6 shadow-sm">
                    <div className="bg-green-700 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-3">
                        <FaUserCog className="w-10 h-10 text-white" />
                    </div>
                    <h2 className="text-2xl font-semibold text-gray-800">Administrador</h2>
                </div>

                {/* ---Opciones Principales --- */}
                <div className="bg-gray-200 rounded-xl shadow-sm mb-4 p-4">
                    <h3 className="text-xl font-bold text-gray-800 text-center mb-4">
                        Opciones principales de Administrador
                    </h3>

                    <ul className="bg-white rounded-xl overflow-hidden shadow-sm">
                        {/* Botón "Gestion de Reportes" */}
                        <li>
                           <Link to="/admin/gestion-reportes" className="flex items-center justify-between p-4 w-full text-left border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <FaFileAlt className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700 font-medium">Gestion de Reportes</span>
                                </div>
                                <FaChevronRight className="w-4 h-4 text-gray-400" />
                            </Link>
                        </li>

                        {/* Botón "Configuración" */}
                        <li>
                            <Link to="/admin/configuracion" className="flex items-center justify-between p-4 w-full text-left hover:bg-gray-50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <FaCog className="w-5 h-5 text-gray-500" />
                                    <span className="text-gray-700 font-medium">Configuración</span>
                                </div>
                                <FaChevronRight className="w-4 h-4 text-gray-400" />
                            </Link>
                        </li>
                    </ul>
                </div>

                {/* --- Grupo de Cerrar Sesión --- */}
                <div className="bg-gray-200 rounded-xl shadow-sm mb-6 p-4">
                    <ul className="bg-white rounded-xl overflow-hidden shadow-sm">
                        <li>
                            <button
                                className="flex items-center justify-between p-4 w-full text-left hover:bg-gray-50 transition-colors"
                            >
                                
                                <div className="flex items-center gap-3">
                                    <FaSignOutAlt className="w-5 h-5 text-red-500" />
                                    <span className="text-red-500 font-medium">Cerrar Sesión</span>
                                </div>
                                <FaChevronRight className="w-4 h-4 text-gray-400" />
                            </button>
                        </li>
                    </ul>
                </div>

            </main>
            <div className="text-center space-y-4 pt-4">
                <div>
                    <img src={monkeyLogo} alt="MonkeyDevs" className="h-16 mx-auto opacity-70" />
                </div>
            </div>

        </div>
    );
};

export default AdminProfileView;