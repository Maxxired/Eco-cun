import { Link, useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("role"); 
  const profileDestination = userRole === "Admin" ? "/admin-profile" : "/opciones";
  const iconClass = (path: string) => {
    const isActive = location.pathname === path || (path !== "/" && location.pathname.startsWith(path));
    return `w-7 h-7 transition-opacity duration-200 ${
      isActive ? "opacity-100 scale-110" : "opacity-60"
    }`;
  };

  const getProfileIconClass = () => {
    const isProfileActive = 
      location.pathname.includes("/opciones") || 
      location.pathname.includes("/admin-profile") || 
      location.pathname.includes("/mis-reportes") ||
      location.pathname.includes("/terminos") ||
      location.pathname.includes("/admin/gestion-reportes"); 

    return `w-7 h-7 transition-opacity duration-200 ${
      isProfileActive ? "opacity-100 scale-110" : "opacity-60"
    }`;
  };

  return (
    <nav 
      className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-20 shadow-[0_-5px_15px_rgba(0,0,0,0.05)] md:hidden"
    >
      <div className="flex justify-around items-center h-full px-2 pb-2">
        
        {/* 1. Home */}
        <Link to="/" className="flex flex-col items-center justify-center w-14 h-14">
          <img src="/home_icon.svg" alt="Inicio" className={iconClass("/")} />
        </Link>

        {/* 2. Mapa */}
        <Link to="/maps" className="flex flex-col items-center justify-center w-14 h-14">
          <img src="/mapa_icon.svg" alt="Mapa" className={iconClass("/maps")} />
        </Link>

        {/* 3. ECOAPORTA (DESTACADO) */}
        <div className="relative -top-2"> 
          <Link
            to="/ecoaporta"
            className="flex items-center justify-center w-16 h-16 bg-[#C8E6C9] rounded-2xl shadow-lg transform transition-transform active:scale-95 hover:scale-105 border-0 border-white"
          >
            <img
              src="/ecoaporta_icon.svg"
              alt="EcoAporta"
              className="w-8 h-8"
            />
          </Link>
        </div>

        {/* 4. Campañas */}
        <Link to="/campaings" className="flex flex-col items-center justify-center w-14 h-14">
          <img
            src="/campaigns_icon.svg"
            alt="Campañas"
            className={iconClass("/campaings")}
          />
        </Link>

        {/* 5. PERFIL (DINÁMICO) */}
        <Link 
          to={profileDestination} 
          className="flex flex-col items-center justify-center w-14 h-14"
        >
          <img
            src="/profile_icon.svg"
            alt="Perfil"
            className={getProfileIconClass()} 
          />
        </Link>

      </div>
    </nav>
  );
};

export default BottomNavBar;