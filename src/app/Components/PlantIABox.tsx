import { useState, useEffect } from "react";

const tips = [
  "🌿 ¿Sabías que una botella tarda más de 400 años en degradarse?",
  "♻️ Separar residuos orgánicos e inorgánicos reduce hasta un 30% la basura doméstica.",
  "🌎 Plantar un árbol puede absorber hasta 22 kg de CO₂ al año.",
  "🚶 Caminar en vez de usar coche reduce tu huella de carbono y mejora tu salud.",
  "💧 Cierra la llave mientras te cepillas: puedes ahorrar hasta 20 litros por día.",
];

export const PlantIABox = () => {
  const [tipIndex, setTipIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setTipIndex((prev) => (prev + 1) % tips.length);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed bottom-[80px] left-5 w-[280px] max-w-[90vw] bg-white/90 backdrop-blur-md shadow-xl rounded-xl p-4 text-sm text-[#228B4B] z-[90]">
      <p className="leading-snug">{tips[tipIndex]}</p>
    </div>
  );
};
