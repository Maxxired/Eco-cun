import {Link, useLocation} from "react-router-dom";

const BottomNavBar = () => {
    const location = useLocation();
    const userRole = localStorage.getItem("role");
    const isLogged = Boolean(localStorage.getItem("token"));

    const profileDestination = userRole === "Admin" ? "/admin-profile" : "/opciones";
    const isRouteActive = (linkPath: string) => {
        if (linkPath === profileDestination || linkPath === "/opciones") {
            return (
                location.pathname.includes("/opciones") ||
                location.pathname.includes("/admin-profile") ||
                location.pathname.includes("/mis-reportes") ||
                location.pathname.includes("/terminos")
            );
        }

        if (linkPath === "/") return location.pathname === "/";

        return location.pathname.startsWith(linkPath);
    };

    const getLinkClasses = (linkPath: string) => {
        const isActive = isRouteActive(linkPath)
        const containerStyle = `flex items-center justify-center w-14 h-14 rounded-2xl transition-all duration-300 ${
            isActive
                ? "bg-[#C8E6C9] transform scale-105" 
                : "hover:bg-gray-50"
        }`;

        const iconStyle = `w-7 h-7 transition-opacity ${isActive ? 'opacity-100' : 'opacity-60'}`;

        return {containerStyle, iconStyle};
    };


    return (
        <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-110 h-20 md:hidden">
            <div className="flex justify-around items-center h-full px-2">

                {/* 1. Home */}
                <Link to="/" className={getLinkClasses("/").containerStyle}>
                    <img src="/home_icon.svg" alt="Inicio" className={getLinkClasses("/").iconStyle}/>
                </Link>

                {/* 2. Mapa */}
                <Link to="/maps" className={getLinkClasses("/maps").containerStyle}>
                    <img src="/mapa_icon.svg" alt="Mapa" className={getLinkClasses("/maps").iconStyle}/>
                </Link>

                {/* 3. ECOAPORTA */}
                <Link to="/ecoaporta" className={getLinkClasses("/ecoaporta").containerStyle}>
                    <img
                        src="/ecoaporta_icon.svg"
                        alt="EcoAporta"
                        className={getLinkClasses("/ecoaporta").iconStyle}
                    />
                </Link>

                {/* 4. Campañas */}
                <Link to="/campaings" className={getLinkClasses("/campaings").containerStyle}>
                    <img
                        src="/campaigns_icon.svg"
                        alt="Campañas"
                        className={getLinkClasses("/campaings").iconStyle}
                    />
                </Link>

                {/* 5. PERFIL */}
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