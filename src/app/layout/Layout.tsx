import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import PWABadge from "../pwa/PWABadge";

type LinkItem = { label: string; to: string };
type LayoutProps = {
    title?: string;
    links?: LinkItem[];
    footerText?: string;
};

export default function Layout({
    title = "My Home",
    links = [
        { label: "Inicio", to: "/" },
        { label: "Reportes", to: "/reports" },
        { label: "Ajustes", to: "/settings" },
    ],
    footerText = "© " + new Date().getFullYear() + " My Company",
}: LayoutProps) {
    const [open, setOpen] = useState(false);
    const [dark, setDark] = useState(false);

    useEffect(() => {
        const saved = localStorage.getItem("theme") === "dark";
        setDark(saved);
        document.documentElement.classList.toggle("dark", saved);
    }, []);

    const toggleDark = () => {
        const next = !dark;
        setDark(next);
        document.documentElement.classList.toggle("dark", next);
        localStorage.setItem("theme", next ? "dark" : "light");
    };

    return (
        <div className="min-h-dvh bg-gray-50 text-gray-900 dark:bg-gray-700 dark:text-gray-100"> {/*aqui se cambia el color de fondo*/}
            {/* NAVBAR */}
            <nav className="sticky top-0 z-40 border-b border-gray-200/70 bg-white/80 backdrop-blur dark:border-gray-800 dark:bg-gray-900/70">
                <div className="mx-auto max-w-7xl h-14 px-4 sm:px-6 lg:px-8 flex items-center">
                    {/* Brand + menu móvil */}
                    <button
                        className="mr-2 rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800 md:hidden"
                        onClick={() => setOpen((v) => !v)}
                        aria-label="Abrir menú"
                    >
                        <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M4 6h16M4 12h16M4 18h16" />
                        </svg>
                    </button>

                    <div className="flex items-center gap-2">
                        <div className="h-6 w-6 rounded bg-gradient-to-tr from-indigo-500 to-cyan-400" />
                        <span className="font-semibold tracking-tight">{title}</span>
                    </div>

                    {/* Links (desktop) */}
                    <ul className="ml-6 hidden md:flex items-center gap-1">
                        {links.map((l) => (
                            <li key={l.to}>
                                <NavLink
                                    to={l.to}
                                    className={({ isActive }) =>
                                        [
                                            "rounded-md px-3 py-2 text-sm",
                                            isActive
                                                ? "bg-gray-100 font-medium dark:bg-gray-800"
                                                : "hover:bg-gray-100 dark:hover:bg-gray-800",
                                        ].join(" ")
                                    }
                                >
                                    {l.label}
                                </NavLink>
                            </li>
                        ))}
                    </ul>

                    {/* Acciones derecha */}
                    <div className="ml-auto flex items-center gap-2">
                        <div className="hidden sm:block">
                            <input
                                type="search"
                                placeholder="Buscar…"
                                className="h-9 w-56 rounded-md border border-gray-200 bg-white px-3 text-sm outline-none placeholder:text-gray-400 focus:ring-2 focus:ring-indigo-500 dark:border-gray-800 dark:bg-gray-900"
                            />
                        </div>

                        <button
                            onClick={toggleDark}
                            className="rounded p-2 hover:bg-gray-100 dark:hover:bg-gray-800"
                            aria-label="Cambiar tema"
                            title="Cambiar tema"
                        >
                            {dark ? (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M12 4V2M12 22v-2M4.93 4.93 3.52 3.52M20.48 20.48l-1.41-1.41M4 12H2m20 0h-2M4.93 19.07 3.52 20.48M20.48 3.52l-1.41 1.41" />
                                    <circle cx="12" cy="12" r="4" />
                                </svg>
                            ) : (
                                <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                                    <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 0 0 9.79 9.79z" />
                                </svg>
                            )}
                        </button>
                    </div>
                </div>

                {/* Links (móvil) */}
                {open && (
                    <div className="md:hidden border-t border-gray-200 dark:border-gray-800">
                        <ul className="px-2 py-2">
                            {links.map((l) => (
                                <li key={l.to}>
                                    <NavLink
                                        to={l.to}
                                        onClick={() => setOpen(false)}
                                        className={({ isActive }) =>
                                            [
                                                "block rounded-md px-3 py-2 text-sm",
                                                isActive
                                                    ? "bg-gray-100 font-medium dark:bg-gray-800"
                                                    : "hover:bg-gray-100 dark:hover:bg-gray-800",
                                            ].join(" ")
                                        }
                                    >
                                        {l.label}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </nav>

            {/* CONTENIDO */}
            <main id="content" className="min-h-[calc(100dvh-3.5rem)]">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <Outlet />
                </div>
            </main>

            {/* FOOTER */}
            <footer className="border-t border-gray-200 bg-white py-3 text-sm text-center dark:border-gray-800 dark:bg-gray-950">
                {footerText}
            </footer>
            <PWABadge />

        </div>
    );
}
