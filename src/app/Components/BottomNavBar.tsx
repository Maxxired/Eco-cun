import { useState } from "react";

const BottomNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-green-700 text-white md:hidden z-50 shadow-md">
      <div className="flex justify-around items-center py-8 text-sm font-medium">
        <a
          href="/avisos"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          Avisos
        </a>
        <a
          href="/ubicacion"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          Ubicación
        </a>
        <a
          href="/"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          Inicio
        </a>
        <a
          href="/reciclaje"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          Recicla
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          Menú
        </button>
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <div className="bg-green-800 text-white p-4 border-t border-green-600">
          <ul className="space-y-2 text-sm">
            <li>
              <a href="/perfil" className="block hover:underline">
                Perfil
              </a>
            </li>
            <li>
              <a href="/configuracion" className="block hover:underline">
                Configuración
              </a>
            </li>
            <li>
              <a href="/cerrar" className="block hover:underline">
                Cerrar sesión
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default BottomNavBar;
