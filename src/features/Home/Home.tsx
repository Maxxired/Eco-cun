import { useState } from "react";
import reactLogo from "@/assets/react.svg";
import appLogo from "/favicon.svg";

export default function Home() {
    const [count, setCount] = useState(0);

    return (
        <div className="min-h-[calc(100dvh-4rem)] bg-gradient-to-b from-sky-50 to-white dark:from-gray-900 dark:to-gray-950 text-gray-900 dark:text-gray-100">
            {/* Hero */}
            <section className="flex flex-col items-center justify-center text-center py-20 px-6">
                <div className="flex items-center gap-3 mb-6">
                    <img src={appLogo} alt="App logo" className="h-12 w-12" />
                    <h1 className="text-4xl font-bold sm:text-5xl">EcoCun</h1>
                </div>
                <p className="max-w-2xl text-gray-600 dark:text-gray-400 text-lg mb-8">
                    Bienvenido a <span className="font-semibold text-sky-600 dark:text-sky-400">EcoCun</span> — una
                    plataforma creada con React, Vite y Tailwind para ofrecer velocidad, estilo y rendimiento PWA.
                </p>
                <button
                    onClick={() => setCount((c) => c + 1)}
                    className="px-6 py-3 rounded-lg bg-sky-600 text-white font-medium shadow hover:bg-sky-700 transition"
                >
                    Clicks: {count}
                </button>
            </section>

            {/* Features */}
            <section className="py-16 bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-800">
                <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-3 gap-10 text-center">
                    <div className="p-6 rounded-2xl bg-sky-50 dark:bg-gray-800">
                        <img src={reactLogo} alt="React" className="mx-auto h-12 mb-3" />
                        <h3 className="text-lg font-semibold mb-2">React + Vite</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Desarrollo rápido con HMR y componentes reutilizables.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-sky-50 dark:bg-gray-800">
                        <svg
                            className="w-12 h-12 mx-auto text-sky-500 dark:text-sky-400 mb-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 8v4l3 3m6 2a9 9 0 1 1-18 0 9 9 0 0 1 18 0z" />
                        </svg>
                        <h3 className="text-lg font-semibold mb-2">PWA lista</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Instalable, usable offline y con notificaciones integradas.
                        </p>
                    </div>

                    <div className="p-6 rounded-2xl bg-sky-50 dark:bg-gray-800">
                        <svg
                            className="w-12 h-12 mx-auto text-sky-500 dark:text-sky-400 mb-3"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            viewBox="0 0 24 24"
                        >
                            <path d="M12 20h9" />
                            <path d="M12 4h9" />
                            <path d="M12 12h9" />
                            <path d="M3 6h.01" />
                            <path d="M3 18h.01" />
                        </svg>
                        <h3 className="text-lg font-semibold mb-2">Tailwind CSS</h3>
                        <p className="text-gray-600 dark:text-gray-400">
                            Estilos rápidos, limpios y totalmente personalizables.
                        </p>
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-20 bg-sky-600 dark:bg-sky-700 text-white text-center">
                <h2 className="text-3xl font-bold mb-4">Comienza a construir con EcoCun</h2>
                <p className="mb-6 text-lg text-sky-100 max-w-xl mx-auto">
                    Desarrolla experiencias rápidas, modernas y progresivas para todos los dispositivos.
                </p>
                <a
                    href="#"
                    className="px-6 py-3 bg-white text-sky-600 font-semibold rounded-lg shadow hover:bg-sky-50 transition"
                >
                    Explorar documentación
                </a>
            </section>
        </div>
    );
}
