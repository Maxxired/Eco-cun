import React from 'react';
import { Link } from 'react-router-dom'; 
import { 
  FaUser,           
  FaFileAlt,        
  FaCog,            
  FaSignOutAlt,     
  FaChevronRight    
} from 'react-icons/fa';
const monkeyLogo = "/monkeydev_logo_blanco_slogan.png";
const OptionsView: React.FC = () => {
  return (
  <div className="min-h-screen bg-gray-100 pb-20 flex flex-col">
      <main className="p-4">
        <div className="bg-gray-200 rounded-xl p-6 flex flex-col items-center justify-center mb-6 shadow-sm">
          <div className="bg-[#228B4B] rounded-full p-4 w-20 h-20 flex items-center justify-center mb-3">
            <FaUser className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-2xl font-semibold text-gray-800">Hola, Usuario</h2>
        </div>
        <div className="bg-white rounded-xl shadow-sm mb-4 overflow-hidden">
          <ul>
            <li>
              <Link to="/mis-reportes" className="flex items-center justify-between p-4 w-full text-left border-b border-gray-100 hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FaFileAlt className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Mis reportes</span>
                </div>
                <FaChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </li>
            <li>
              <Link to="/configuracion" className="flex items-center justify-between p-4 w-full text-left hover:bg-gray-50 transition-colors">
                <div className="flex items-center gap-3">
                  <FaCog className="w-5 h-5 text-gray-500" />
                  <span className="text-gray-700 font-medium">Configuración</span>
                </div>
                <FaChevronRight className="w-4 h-4 text-gray-400" />
              </Link>
            </li>
          </ul>
        </div>
        <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
          <ul>
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
      <div className="text-center space-y-4 mt-auto pb-4">
          <a href="/terminos" className="text-sm text-gray-500 underline hover:text-gray-700">
            Terminos y condiciones
          </a>
          <div>
            <img src={monkeyLogo} alt="MonkeyDevs" className="h-20 mx-auto" />
          </div>
        </div>

      </main>
    </div>
  );
};

export default OptionsView;