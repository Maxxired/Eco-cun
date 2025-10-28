
import { NavLink, Outlet } from "react-router-dom";
import PWABadge from "../pwa/PWABadge";

type LinkItem = { label: string; to: string };
type LayoutProps = {
    title?: string;
    links?: LinkItem[];
    footerText?: string;
};

export default function Layout({
}: LayoutProps) {

    return (
        <div className="min-h-dvh bg-gray-50 text-gray-900 dark:bg-[#007007] dark:text-gray-100"> {/*aqui se cambia el color de fondo*/}
            {/* NAVBAR */}
            <nav className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
                
            </nav>

            {/* CONTENIDO */}
            <main id="content" className="min-h-[calc(100dvh-3.5rem)]">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>

            {/* FOOTER */}
            <footer className="border-t border-gray-200 bg-white py-3 text-sm text-center dark:border-white dark:bg-gray-50 text-black">
            ECOCUN
            </footer>
            <PWABadge />

        </div>
    );
}
