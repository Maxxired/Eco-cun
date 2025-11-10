import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight } from 'react-icons/fa';

type ReportStatus = 'Nuevo' | 'En proceso' | 'Resueltos';
export interface ReportCardProps {
    folio: string;
    ubicacion: string;
    caso: string;
    status: ReportStatus;
}

const statusColors: Record<ReportStatus, string> = {
    'Nuevo': 'bg-red-400 text-white',
    'En proceso': 'bg-green-500 text-white',
    'Resueltos': 'bg-indigo-500 text-white',
};

const ReportCard: React.FC<ReportCardProps> = ({ folio, ubicacion, caso, status }) => {
    return (
        <div className="bg-white rounded-lg shadow-md p-4 relative overflow-hidden">
            <span
                className={`absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full ${statusColors[status]}`}
            >
                {status}
            </span>
            <div className="pr-20">
                <h3 className="font-bold text-lg mb-2">Folio: {folio}</h3>
                <p className="text-sm text-gray-700">
                    <span className="font-bold">Ubicacion:</span> {ubicacion}
                </p>
                <p className="text-sm text-gray-700">
                    <span className="font-bold">Caso:</span> {caso}
                </p>
            </div>

            <Link
                to={`/reportes/${folio}`}
                className="text-sm text-gray-500 hover:text-gray-700 mt-3 inline-flex items-center gap-1"
            >
                Ver detalles <FaChevronRight className="w-3 h-3" />
            </Link>
        </div>
    );
};

export default ReportCard;