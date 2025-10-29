import { useState } from "react";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-[#228B4B] text-white px-4 py-5">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo + Marca */}
        <a href="/" className="flex items-center space-x-2">
          <img src="logo_blanco.png" alt="Ecocun" className="h-8 w-8" />
          <span className="text-xl font-bold">Ecocun</span>
        </a>

        {/* Botón hamburguesa */}
        <button
          className="md:hidden focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
            />
          </svg>
        </button>

        {/* Menú de navegación */}
        <ul
          className={`flex-col md:flex-row md:flex md:space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-green-600 md:bg-transparent transition-all duration-300 ease-in-out ${
            isOpen ? "flex" : "hidden"
          }`}
        >
          <li>
            <a
              href="/"
              className="block px-4 py-2 hover:text-gray-200 hover:bg-amber-300"
            >
              Inicio
            </a>
          </li>
          <li>
            <a
              href="/servicios"
              className="block px-4 py-2 hover:text-gray-200"
            >
              Servicios
            </a>
          </li>
          <li>
            <a href="/contacto" className="block px-4 py-2 hover:text-gray-200">
              Contacto
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
