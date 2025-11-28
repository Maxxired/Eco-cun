import React from 'react';
import { FaChevronRight } from 'react-icons/fa';

export interface ReportCardProps {
  folio: string;
  ubicacion: string;
  caso: string;
  status: string;
  description?: string;
  imageUrl?: string;
  onViewDetails?: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ 
  folio, ubicacion, caso, status, onViewDetails 
}) => {
  
  // Colores estilo "Badge" de tu imagen
  const getStatusColor = (s: string) => {
    if (s === 'Nuevo') return 'bg-[#F87171]'; // Rojo salmón
    if (s === 'En proceso') return 'bg-[#4ADE80]'; // Verde claro
    if (s === 'Resueltos') return 'bg-[#818CF8]'; // Morado suave
    return 'bg-gray-400';
  };

  return (
    // FONDO GRIS CLARO y BORDE REDONDEADO
    <div className="bg-gray-100 rounded-2xl p-5 mb-4 relative shadow-sm">
      
      {/* Badge Flotante */}
      <span className={`${getStatusColor(status)} text-white text-xs font-bold px-3 py-1 rounded-full absolute top-5 right-5`}>
        {status}
      </span>

      {/* Datos */}
      <div className="mb-1">
        <h3 className="text-xl font-bold text-gray-900">Folio: {folio}</h3>
      </div>
      
      <div className="text-sm text-gray-800 mb-1">
        <span className="font-bold">Ubicacion:</span> {ubicacion}
      </div>
      
      <div className="text-sm text-gray-800 mb-4">
        <span className="font-bold">Caso:</span> {caso}
      </div>

      {/* Link Ver Detalles */}
      <div className="flex justify-end">
        <button 
          onClick={onViewDetails} 
          className="text-green-600 font-bold text-sm flex items-center gap-1 hover:underline"
        >
          Ver detalles <FaChevronRight className="text-xs" />
        </button>
      </div>
    </div>
  );
};

export default ReportCard;