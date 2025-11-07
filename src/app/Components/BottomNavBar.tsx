import { useState } from "react";

const BottomNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed bottom-0 left-0 right-0 border-2 border-gray-200 bg-gray-100 text-white md:hidden z-50 shadow-md">
      <div className="flex justify-around items-center py-5 text-sm font-medium">
        <a
          href="/ecoaporta"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img
            src="ecoaporta_icon.svg"
            alt="icono ecoaporta"
            className="w-10"
          ></img>
        </a>
        <a
          href="/Maps"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img src="mapa_icon.svg" alt="icono mapa" className="w-10"></img>
        </a>
        <a
          href="/"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img src="home_icon.svg" alt="icono home" className="w-10"></img>
        </a>
        <a
          href="/campaings"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img
            src="campaigns_icon.svg"
            alt="icono campaigns"
            className="w-10"
          ></img>
        </a>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img src="menu_icon.svg" alt="icono menu" className="w-10"></img>
        </button>
      </div>

      {/* Menú desplegable */}
      {isOpen && (
        <>
          {/* Botón para abrir el menú */}
          <button
            onClick={() => setIsOpen(true)}
            className="fixed bottom-4 right-4 bg-[#228B4B] text-white px-4 py-2 rounded-md shadow-md hover:bg-green-800 transition-colors z-50"
          >
            Menú
          </button>

          {/* Fondo oscuro al abrir */}
          {isOpen && (
            <div
              className="fixed inset-0 bg-black/40 z-40 transform transition-transform duration-300"
              onClick={() => setIsOpen(false)}
            />
          )}

          {/* Menú lateral */}
          <div
            className={`fixed top-0 right-0 h-full w-64 bg-[#228B4B] text-white p-6 shadow-lg transform transition-transform duration-300 z-50 ${
              isOpen ? "translate-x-0" : "translate-x-full"
            }`}
          >
            <button
              onClick={() => setIsOpen(false)}
              className="text-white text-sm mb-4 hover:underline"
            >
              Cerrar ✕
            </button>

            <ul className="space-y-4 text-sm">
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
                <a href="/iniciar_sesion" className="block hover:underline">
                  Cerrar sesión
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </nav>
  );
};

export default BottomNavBar;
