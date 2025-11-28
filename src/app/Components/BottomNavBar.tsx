import { Link, useLocation } from "react-router-dom";

const BottomNavBar = () => {
  const location = useLocation();
  const userRole = localStorage.getItem("role"); 
  
  // La ruta de destino del perfil se mantiene dinámica
  const profileDestination = userRole === "Admin" ? "/admin-profile" : "/opciones";

  // Función general para determinar si una ruta es la activa o una sub-ruta
  const isRouteActive = (linkPath: string) => {
    // Casos especiales (rutas que activan el mismo icono)
    if (linkPath === profileDestination) {
      // Activa si la URL actual incluye cualquiera de las rutas de perfil/admin/reportes
      return (
        location.pathname.includes("/opciones") || 
        location.pathname.includes("/admin-profile") || 
        location.pathname.includes("/mis-reportes") ||
        location.pathname.includes("/terminos") ||
        location.pathname.includes("/admin/gestion-reportes")
      );
    }
    
    // Casos normales (Home, Maps, EcoAporta, Campañas)
    // Usa 'startsWith' para rutas como /maps/detail/1 si tienes sub-rutas
    if (linkPath === "/") return location.pathname === "/";
    
    return location.pathname.startsWith(linkPath);
  };
  
  // Helper que devuelve las clases de estilo del link
  const getLinkClasses = (linkPath: string) => {
    const isActive = isRouteActive(linkPath);
    
    // Si es activo, le ponemos el fondo verde claro (el 'cuadrito')
    const activeStyle = isActive
      ? "bg-[#C8E6C9] rounded-2xl shadow-md transform scale-[1.1] " 
      : "opacity-80 hover:opacity-100";
      
    // Estilo para el icono dentro del botón
    const iconStyle = `w-7 h-7 transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`;
    
    return { activeStyle, iconStyle };
  };


  return (
    // Quitamos la sombra flotante y reducimos la altura a h-16 para un look más compacto
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 h-16 md:hidden">
      <div className="flex justify-around items-center h-full px-2">
        
        {/* Los 5 Íconos en el ORDEN original del código */}
        
        {/* 1. Home (Home) */}
        <Link to="/" className={`flex flex-col items-center justify-center w-1/5 h-full ${getLinkClasses("/").activeStyle}`}>
          <img src="/home_icon.svg" alt="Inicio" className={getLinkClasses("/").iconStyle} />
        </Link>

        {/* 2. Mapa (Maps) */}
        <Link to="/maps" className={`flex flex-col items-center justify-center w-1/5 h-full ${getLinkClasses("/maps").activeStyle}`}>
          <img src="/mapa_icon.svg" alt="Mapa" className={getLinkClasses("/maps").iconStyle} />
        </Link>

        {/* 3. ECOAPORTA (Destacado en el Diseño Anterior) */}
        {/* Ahora luce como un botón activo normal, pero en el centro */}
        <Link to="/ecoaporta" className={`flex flex-col items-center justify-center w-1/5 h-full ${getLinkClasses("/ecoaporta").activeStyle}`}>
          <img
            src="/ecoaporta_icon.svg"
            alt="EcoAporta"
            className={getLinkClasses("/ecoaporta").iconStyle}
          />
        </Link>

        {/* 4. Campañas (Campaings) */}
        <Link to="/campaings" className={`flex flex-col items-center justify-center w-1/5 h-full ${getLinkClasses("/campaings").activeStyle}`}>
          <img
            src="/campaigns_icon.svg"
            alt="Campañas"
            className={getLinkClasses("/campaings").iconStyle}
          />
        </Link>

        {/* 5. PERFIL / OPCIONES (Dinámico) */}
        <Link to={profileDestination} className={`flex flex-col items-center justify-center w-1/5 h-full ${getLinkClasses(profileDestination).activeStyle}`}>
          <img
            src="/profile_icon.svg"
            alt="Perfil"
            className={getLinkClasses(profileDestination).iconStyle} 
          />
        </Link>

      </div>
    </nav>
  );
};

export default BottomNavBar;