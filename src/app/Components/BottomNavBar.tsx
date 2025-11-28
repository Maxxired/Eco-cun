import { Link } from "react-router-dom";

const BottomNavBar = () => {
  return (
    <nav className="fixed bottom-0 left-0 right-0 h-20 border-t border-gray-200 bg-gray-100 text-white md:hidden z-[110] shadow-md">
      <div className="flex justify-around items-center py-5 text-sm font-medium">
        <Link
          to="/ecoaporta"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img
            src="ecoaporta_icon.svg"
            alt="icono ecoaporta"
            className="w-10"
          ></img>
        </Link>
        <Link
          to="/Maps"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img src="mapa_icon.svg" alt="icono mapa" className="w-10"></img>
        </Link>
        <Link
          to="/"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img src="home_icon.svg" alt="icono home" className="w-10"></img>
        </Link>
        <Link
          to="/campaings"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img
            src="campaigns_icon.svg"
            alt="icono campaigns"
            className="w-10"
          ></img>
        </Link>
        <Link
          to="/opciones"
          className="hover:bg-green-800 px-3 py-2 rounded-md transition-colors"
        >
          <img
            src="profile_icon.svg"
            alt="icono ecoaporta"
            className="w-10"
          ></img>
        </Link>
      </div>
    </nav>
  );
};

export default BottomNavBar;
