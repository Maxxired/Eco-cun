import { Link } from "react-router-dom";

const NavBar = () => {
  const userRole = localStorage.getItem("role");
  const profileDestination = userRole === "Admin" ? "/admin-profile" : "/opciones";

  return (
    <nav className="bg-[#228B4B] text-white px-4 py-4 shadow-md sticky top-0 z-50">
      <div className="container mx-auto flex items-center justify-between">
        
        {/* Logo + Marca */}
        <a href="/" className="flex items-center space-x-3">
          <img src="/logo_blanco.png" alt="Ecocun" className="h-11 w-11" />
          <span className="text-xl font-bold tracking-wide">Ecocun</span>
        </a>

        {/* Menú de navegación (PC) */}
        <ul className="hidden md:flex md:items-center md:space-x-6">
          <li><Link to="/" className="block px-3 py-2 hover:bg-white/10 rounded-lg transition-all">Inicio</Link></li>
          <li><Link to="/ecoaporta" className="block px-3 py-2 hover:bg-white/10 rounded-lg transition-all">EcoAporta</Link></li>
          <li><Link to="/Maps" className="block px-3 py-2 hover:bg-white/10 rounded-lg transition-all">Mapa</Link></li>
          <li><Link to="/campaings" className="block px-3 py-2 hover:bg-white/10 rounded-lg transition-all">Campañas</Link></li>
          <li><Link to="/opciones" className="block px-3 py-2 hover:bg-white/10 rounded-lg transition-all">Opciones</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default NavBar;