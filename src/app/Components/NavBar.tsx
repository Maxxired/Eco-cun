import { Link } from "react-router-dom";

const NavBar = () => {
  return (
    <nav className="bg-[#228B4B] text-white px-2 py-5">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo + Marca */}
        <a href="/" className="flex items-center space-x-2">
          <img src="logo_blanco.png" alt="Ecocun" className="h-8 w-8" />
          <span className="text-xl font-bold">Ecocun</span>
        </a>

        {/* Menú de navegación */}
        <ul
          className={`z-50 flex-col md:flex-row md:flex hidden md:space-x-6 absolute md:static top-full left-0 w-full md:w-auto bg-[#228B4B]  md:bg-transparent transition-all duration-300 ease-in-out"
          }`}
        >
          <li>
            <Link
              to="/"
              className="block px-4 py-2 hover:text-gray-200 hover:bg-[#1738178c] hover:rounded-xl "
            >
              Inicio
            </Link>
          </li>
          <li>
            <Link
              to="/ecoaporta"
              className="block px-4 py-2 hover:text-gray-200 hover:bg-[#1738178c] hover:rounded-xl "
            >
              EcoAporta
            </Link>
          </li>
          <li>
            <Link
            to="/Maps"  
          className="block px-4 py-2 hover:text-gray-200 hover:bg-[#1738178c] hover:rounded-xl "
            >
              Mapa
            </Link>
          </li>
          <li>
            <Link
              to="/campaings"
      
              className="block px-4 py-2 hover:text-gray-200 hover:bg-[#1738178c] hover:rounded-xl "
            >
              Campañas
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;
