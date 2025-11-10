// src/app/Components/ReportCard/ReportCard.tsx

import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

// Definimos los tipos de 'status' que aceptaremos
type ReportStatus = 'Nuevo' | 'En proceso' | 'Resueltos';

export interface ReportCardProps { // Exportamos las props para usarlas en la vista
  folio: string;
  ubicacion: string;
  caso: string;
  status: ReportStatus;
}

// Un objeto para mapear el status a los colores de Tailwind
const statusColors: Record<ReportStatus, string> = {
  'Nuevo': 'bg-red-400 text-white',
  'En proceso': 'bg-green-500 text-white',
  'Resueltos': 'bg-indigo-500 text-white',
};

const ReportCard: React.FC<ReportCardProps> = ({ folio, ubicacion, caso, status }) => {
  return (
    // Tarjeta principal con sombra y bordes redondeados
    <div className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden">
      
      {/* Badge de Status (flota en la esquina) */}
      <span 
        className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[status]}`}
      >
        {status}
      </span>

      {/* Contenido de la tarjeta */}
      <div className="pr-20"> {/* Padding a la derecha para que no choque con el badge */}
        <h3 className="font-bold text-lg mb-2">Folio: {folio}</h3>
        <p className="text-sm text-gray-700">
          <span className="font-bold">Ubicacion:</span> {ubicacion}
        </p>
        <p className="text-sm text-gray-700">
          <span className="font-bold">Caso:</span> {caso}
        </p>
      </div>

      {/* Link de "Ver detalles" */}
      <Link 
        to={`/reportes/${folio}`} // Ruta dinámica (ej. /reportes/0001)
        className="text-sm text-gray-500 hover:text-gray-700 mt-3 inline-flex items-center gap-1"
      >
        Ver detalles <FaChevronRight className="w-3 h-3" />
      </Link>
    </div>
  );
};

export default ReportCard;