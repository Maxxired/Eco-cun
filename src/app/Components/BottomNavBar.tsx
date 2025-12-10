import {Link, useLocation} from "react-router-dom";

const BottomNavBar = () => {
    const location = useLocation();
    const userRole = localStorage.getItem("role");
    const isLogged = Boolean(localStorage.getItem("token"));

    // La ruta de destino del perfil se mantiene dinámica
    const profileDestination = userRole === "Admin" ? "/admin-profile" : "/opciones";

    // Función general para determinar si una ruta es la activa o una sub-ruta
    const isRouteActive = (linkPath: string) => {
        // Activa si la URL actual incluye cualquiera de las rutas de perfil/admin/reportes
        if (linkPath === profileDestination || linkPath === "/opciones") {
            return (
                location.pathname.includes("/opciones") ||
                location.pathname.includes("/admin-profile") ||
                location.pathname.includes("/mis-reportes") ||
                location.pathname.includes("/terminos")
            );
        }

        // Para rutas normales (Home, Maps, EcoAporta, Campañas)
        if (linkPath === "/") return location.pathname === "/";

        // Usamos 'startsWith' para que coincida con /maps, /campaings, /ecoaporta
        return location.pathname.startsWith(linkPath);
    };

    // Helper que devuelve las clases de estilo del link
    const getLinkClasses = (linkPath: string) => {
        const isActive = isRouteActive(linkPath);

        // Estilo para el contenedor (el "cuadrito")
        // Le dimos más tamaño (w-14 h-14) para que el fondo se vea, y le ponemos el color si está activo
        const containerStyle = `flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
            isActive
                ? "bg-[#C8E6C9] transform scale-105" // Fondo verde claro
                : "hover:bg-gray-50"
        }`;

        // Estilo para el icono
        const iconStyle = `w-7 h-7 transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`;

        return {containerStyle, iconStyle};
    };


    return (
        // CAMBIO: Aumenté la altura a h-20 para que los iconos no se peguen
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-110 h-20 md:hidden">
            <div className="flex justify-around items-center h-full px-2">

                {/* 1. Home */}
                <Link to="/" className={getLinkClasses("/").containerStyle}>
                    <img src="/home_icon.svg" alt="Inicio" className={getLinkClasses("/").iconStyle}/>
                </Link>

                {/* 2. Mapa */}
                {/* Usamos /maps como ruta oficial */}
                <Link to="/maps" className={getLinkClasses("/maps").containerStyle}>
                    <img src="/mapa_icon.svg" alt="Mapa" className={getLinkClasses("/maps").iconStyle}/>
                </Link>

                {/* 3. ECOAPORTA (YA NO FLOTA) */}
                {/* Ahora se comporta como un icono normal */}
                <Link to="/ecoaporta" className={getLinkClasses("/ecoaporta").containerStyle}>
                    <img
                        src="/ecoaporta_icon.svg"
                        alt="EcoAporta"
                        className={getLinkClasses("/ecoaporta").iconStyle}
                    />
                </Link>

                {/* 4. Campañas */}
                {/* Usamos /campaings como ruta oficial */}
                <Link to="/campaings" className={getLinkClasses("/campaings").containerStyle}>
                    <img
                        src="/campaigns_icon.svg"
                        alt="Campañas"
                        className={getLinkClasses("/campaings").iconStyle}
                    />
                </Link>

                {/* 5. PERFIL / OPCIONES (Dinámico) */}
                {isLogged && (
                    <Link to={profileDestination} className={getLinkClasses(profileDestination).containerStyle}>
                        <img
                            src="/profile_icon.svg"
                            alt="Perfil"
                            className={getLinkClasses(profileDestination).iconStyle}
                        />
                    </Link>
                )}

            </div>
        </nav>
    );
};

export default BottomNavBar;