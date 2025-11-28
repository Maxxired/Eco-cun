import React from 'react';
import { FaChevronRight, FaImage } from 'react-icons/fa';
import { getStatusColor } from '../../utils/enumTranslators';

export interface ReportCardProps {
  folio: string;
  ubicacion: string;
  caso: string;
  status: string;
  description: string;
  imageUrl?: string; // La URL completa de la foto
  onViewDetails?: () => void;
}

const ReportCard: React.FC<ReportCardProps> = ({ 
  folio, ubicacion, caso, status, description, imageUrl, onViewDetails 
}) => {
  
  const badgeColorClass = getStatusColor(status);

  return (
    <div className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden border border-gray-100 flex flex-col">
      
      {/* Badge de Status */}
      <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full ${badgeColorClass}`}>
        {status}
      </span>

      <div className="pr-20">
        <h3 className="font-bold text-xl mb-1">Folio: {folio}</h3>
        <p className="text-sm text-gray-800 mb-1">
          <span className="font-bold">Ubicación:</span> <span className="text-gray-600 text-xs">{ubicacion}</span>
        </p>
        <p className="text-sm text-gray-800 mb-2">
          <span className="font-bold">Caso:</span> {caso}
        </p>
      </div>

      {/* --- AQUÍ MOSTRAMOS LA FOTO EN LA TARJETA (SI EXISTE) --- */}
      {imageUrl ? (
        <div className="mt-2 mb-2 h-32 w-full rounded-lg overflow-hidden border border-gray-200">
          <img 
            src={imageUrl} 
            alt="Evidencia" 
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
         // Si no hay foto, mostramos un cuadrito gris discreto
         <div className="mt-2 mb-2 h-10 w-full bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 text-xs">
            <FaImage className="mr-2"/> Sin foto
         </div>
      )}

      <div className="bg-gray-50 p-2 rounded text-xs text-gray-600 italic border-l-2 border-gray-300 truncate mb-2">
          "{description}"
      </div>

      <div className="flex justify-end">
        <button 
          onClick={onViewDetails} 
          className="text-sm text-green-600 hover:text-green-800 font-bold inline-flex items-center gap-1 transition-colors"
        >
          Ver detalles <FaChevronRight className="w-3 h-3" />
        </button>
      </div>
    </div>
  );
};

export default ReportCard;