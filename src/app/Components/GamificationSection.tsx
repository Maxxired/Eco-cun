import React from "react";
import { motion } from "framer-motion";
import { FaMedal, FaSeedling, FaTree, FaCrown, FaLock } from "react-icons/fa";

const LEVELS = [
  { 
    id: 1, 
    name: "Semilla Ciudadana", 
    minPoints: 0, 
    icon: <FaSeedling />, 
    color: "text-green-400",
    bg: "bg-green-100",
    desc: "Iniciando el cambio."
  },
  { 
    id: 2, 
    name: "Guardián Local", 
    minPoints: 50, 
    icon: <FaTree />, 
    color: "text-green-600",
    bg: "bg-green-200",
    desc: "Protector activo de la zona."
  },
  { 
    id: 3, 
    name: "Héroe de Cancún", 
    minPoints: 150, 
    icon: <FaMedal />, 
    color: "text-yellow-500",
    bg: "bg-yellow-100",
    desc: "Líder comunitario reconocido."
  },
  { 
    id: 4, 
    name: "Leyenda Verde", 
    minPoints: 300, 
    icon: <FaCrown />, 
    color: "text-purple-600",
    bg: "bg-purple-100",
    desc: "El máximo nivel de impacto."
  },
];

interface GamificationProps {
  points: number; // Recibe los puntos actuales del usuario
}

export const GamificationSection: React.FC<GamificationProps> = ({ points }) => {
  
  //  Lógica para encontrar el nivel actual
  const currentLevelIndex = LEVELS.findLastIndex((l) => points >= l.minPoints);
  const currentLevel = LEVELS[currentLevelIndex] || LEVELS[0];
  
  // Lógica para el siguiente nivel
  const nextLevel = LEVELS[currentLevelIndex + 1];

  // Cálculo de la barra de progreso (0% a 100%)
  let progressPercentage = 100; 
  let pointsToNext = 0;

  if (nextLevel) {
    const pointsInThisLevel = points - currentLevel.minPoints;
    const levelRange = nextLevel.minPoints - currentLevel.minPoints;
    progressPercentage = (pointsInThisLevel / levelRange) * 100;
    pointsToNext = nextLevel.minPoints - points;
  }

  return (
    <div className="bg-white rounded-2xl shadow-md p-6 mb-6 border border-gray-100 relative overflow-hidden">
      
      <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-full opacity-20 ${currentLevel.bg}`}></div>

      {/* --- ENCABEZADO: NIVEL Y PUNTOS --- */}
      <div className="flex justify-between items-start mb-4 relative z-10">
        <div>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-wider">Nivel Actual</span>
          <div className="flex items-center gap-2 mt-1">
            <div className={`text-3xl ${currentLevel.color} drop-shadow-sm`}>
                {currentLevel.icon}
            </div>
            <div>
                <h2 className="text-xl font-extrabold text-gray-800 leading-none">{currentLevel.name}</h2>
                <p className="text-xs text-gray-500 mt-1">{currentLevel.desc}</p>
            </div>
          </div>
        </div>
        
        <div className="text-right">
          <div className="text-3xl font-black text-[#228B4B]">{points}</div>
          <div className="text-[10px] text-gray-400 font-bold uppercase">Puntos Ecocun</div>
        </div>
      </div>

      {/* --- BARRA DE PROGRESO --- */}
      <div className="mb-6">
        <div className="flex justify-between text-xs text-gray-500 mb-1">
            <span>Progreso</span>
            {nextLevel ? (
                <span>Faltan <strong>{pointsToNext} pts</strong> para subir</span>
            ) : (
                <span className="text-green-600 font-bold">¡Máximo nivel!</span>
            )}
        </div>
        
        <div className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          {/* Fondo de la barra */}
          <motion.div 
            initial={{ width: 0 }}
            animate={{ width: `${progressPercentage}%` }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-green-400 to-[#228B4B] rounded-full shadow-[0_0_10px_rgba(34,139,75,0.4)]"
          />
        </div>
      </div>

      {/* --- TROFEOS --- */}
      <div>
        <h3 className="text-sm font-bold text-gray-700 mb-3">Tus Recompensas</h3>
        <div className="flex justify-between gap-2">
          {LEVELS.map((level) => {
            const isUnlocked = points >= level.minPoints;
            
            return (
              <div key={level.id} className="flex flex-col items-center gap-2 w-1/4 group">
                <div 
                  className={`w-12 h-12 rounded-xl flex items-center justify-center text-xl transition-all duration-300
                    ${isUnlocked 
                        ? `bg-white border-2 border-${level.color.split('-')[1]}-200 shadow-md scale-105` 
                        : 'bg-gray-50 border border-gray-200 grayscale opacity-60'
                    }`}
                >
                  <span className={isUnlocked ? level.color : "text-gray-300"}>
                    {isUnlocked ? level.icon : <FaLock size={14} />}
                  </span>
                </div>
                
                <span className={`text-[9px] text-center leading-tight font-medium ${isUnlocked ? 'text-gray-700' : 'text-gray-400'}`}>
                  {level.name}
                </span>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};