import { motion } from "framer-motion";
import { PlantitaAnimada } from "../Components/plantIA";
import { PlantIABox } from "../Components/PlantIABox";

const HomeView = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-br from-[#ffffff] via-[#d1eddf] to-[#ffffff] pb-40 px-4 md:px-12 lg:px-24 max-w-5xl mx-auto">
      {/* 🌿 Encabezado con animación */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="text-center mt-10 mb-8"
      >
        <h1 className="text-5xl font-extrabold text-[#1a7f4c] drop-shadow-lg">
          Ecocun
        </h1>
        <p className="text-lg text-gray-700 mt-2">
          Tecnología ciudadana para un Quintana Roo más limpio
        </p>
      </motion.div>

      {/* 🟩 Tarjetas vistosas */}
      <div className="grid gap-6 md:grid-cols-3">
        {/* ¿Qué es? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="bg-gradient-to-tr from-[#239a54] to-[#18693a] text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-bold mb-2">¿Qué es?</h2>
          <p className="text-sm leading-relaxed">
            Una app ciudadana para reportar contaminación y promover acciones
            ecológicas locales.
          </p>
        </motion.div>

        {/* ¿Cómo usarla? */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="bg-gradient-to-tr from-[#18693a] to-[#14562f] text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-bold mb-2">¿Cómo usarla?</h2>
          <ul className="space-y-2 text-sm">
            <li>Reporta zonas contaminadas</li>
            <li>Sube evidencia</li>
            <li>Aprende y actúa</li>
          </ul>
        </motion.div>

        {/* Impacto */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
          className="bg-gradient-to-tr from-[#14562f] to-[#0e3c21] text-white rounded-2xl shadow-xl p-6 hover:scale-105 transition-transform"
        >
          <h2 className="text-xl font-bold mb-2">Impacto</h2>
          <p className="text-sm leading-relaxed">
            Tus reportes inspiran a otros y ayudan a enfocar el trabajo en donde
            realmente se necesita
          </p>
        </motion.div>
      </div>

      {/* 🌱 Elementos flotantes */}
      <PlantitaAnimada />
      <PlantIABox />
    </div>
  );
};

export default HomeView;
