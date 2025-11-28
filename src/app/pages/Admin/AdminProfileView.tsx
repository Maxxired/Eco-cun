import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import { FaUserCog, FaFileAlt, FaUsers, FaCog, FaSignOutAlt, FaChevronRight } from 'react-icons/fa';

const monkeyLogo = "/monkeydev_logo_blanco_slogan.png"; 

const AdminProfileView: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.clear();
    // Redirige a /iniciar_sesion como pediste
    navigate("/iniciar_sesion"); 
  };

  return (
    <div className="min-h-screen bg-gray-100 pb-20 flex flex-col">
      <main className="p-4 flex-grow">
        
        {/* Tarjeta de Perfil (Diseño original) */}
        <div className="bg-green-100 rounded-xl p-6 flex flex-col items-center justify-center mb-6 shadow-sm mt-4 border border-green-200">
          <div className="bg-green-600 rounded-full p-4 w-20 h-20 flex items-center justify-center mb-3 text-white">
            <FaUserCog size={40} />
          </div>
          <h2 className="text-2xl font-bold text-green-900">Administrador</h2>
        </div>

        {/* Menú de Opciones */}
        <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
            {/* Link a TODOS los reportes (Globales) */}
            <Link 
                to="/mis-reportes" 
                className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
            >
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <FaFileAlt className="text-green-600"/> 
                    <span>Gestión de Reportes</span>
                </div>
                <FaChevronRight className="text-gray-400"/>
            </Link>

            {/* Link a Usuarios (Placeholder) */}
            <div className="flex items-center justify-between p-4 border-b border-gray-100 hover:bg-gray-50 cursor-not-allowed opacity-60">
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <FaUsers className="text-green-600"/> 
                    <span>Gestión de Usuarios</span>
                </div>
                <FaChevronRight className="text-gray-400"/>
            </div>

             {/* Link a Configuración (Placeholder) */}
             <div className="flex items-center justify-between p-4 hover:bg-gray-50 cursor-not-allowed opacity-60">
                <div className="flex items-center gap-3 text-gray-700 font-medium">
                    <FaCog className="text-green-600"/> 
                    <span>Configuración</span>
                </div>
                <FaChevronRight className="text-gray-400"/>
            </div>
        </div>

        {/* Botón Cerrar Sesión */}
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <button 
                onClick={handleLogout} 
                className="w-full flex items-center justify-between p-4 hover:bg-red-50 transition-colors"
            >
                <div className="flex items-center gap-3 text-red-500 font-medium">
                    <FaSignOutAlt /> 
                    <span>Cerrar Sesión</span>
                </div>
                <FaChevronRight className="w-4 h-4 text-gray-400" />
            </button>
        </div>

        {/* Footer */}
        <div className="text-center mt-auto opacity-40">
            <img src={monkeyLogo} alt="MonkeyDevs" className="h-10 mx-auto" />
        </div>
      </main>
    </div>
  );
};

export default AdminProfileView;