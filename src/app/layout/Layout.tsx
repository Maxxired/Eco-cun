import { NavLink, Outlet } from "react-router-dom";
import PWABadge from "../pwa/PWABadge";
import "../Components/NavBar";
import NavBar from "../Components/NavBar";
import BottomNavBar from "../Components/BottomNavBar";

type LinkItem = { label: string; to: string };
type LayoutProps = {
  title?: string;
  links?: LinkItem[];
  footerText?: string;
};

export default function Layout({}: LayoutProps) {
  return (
    <div className="min-h-dvh bg-gray-50 text-gray-900 ">
      <nav className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur">
        <NavBar></NavBar>
      </nav>
      {/* CONTENIDO */}
      <main id="content" className="min-h-[calc(100dvh-3.5rem)]">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <Outlet />
        </div>
      </main>
      {/* FOOTER */}
      <footer className="border-t border-[#848484] bg-white py-3 text-sm text-center text-black">
        <BottomNavBar></BottomNavBar>
      </footer>
      <PWABadge />
    </div>
  );
}
