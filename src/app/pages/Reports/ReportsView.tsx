import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import ReportCard, { ReportCardProps } from '../../Components/ReportCard/ReportCard';
import { mapCategoryToString, mapStatusToString } from '../../utils/enumTranslators'; 
const API_URL = "http://localhost:5093";
const monkeyLogo = "/monkeydev_logo_blanco_slogan.png";
interface ReportFromApi {
  id: number;
  userId: number;
  locLatitude: number;
  locLongitude: number;
  description: string;
  category: number | string;
  status: number | string;
  createdAt: string;
  imageUrl?: string;
}

interface ApiResponse {
  message: string;
  data: ReportFromApi[]; 
}

const ReportsView: React.FC = () => {
  const [reports, setReports] = useState<ReportCardProps[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No estás autenticado. Por favor, inicia sesión.');
      setIsLoading(false);
      return; 
    }

    const fetchReports = async () => {
      try {
        const response = await fetch(`${API_URL}/api/Reports/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (response.status === 401) {
          throw new Error('Tu sesión expiró o no es válida.');
        }
        if (!response.ok) {
          throw new Error('Error al cargar los reportes');
        }

        const fullResponse: ApiResponse = await response.json();

        if (fullResponse && fullResponse.data) {
          const translatedReports = fullResponse.data.map((report: ReportFromApi): ReportCardProps => ({
            folio: report.id.toString().padStart(4, '0'), 
            ubicacion: `Lat: ${report.locLatitude.toFixed(4)}, Lon: ${report.locLongitude.toFixed(4)}`, 
            caso: mapCategoryToString(report.category), 
            status: mapStatusToString(report.status) 
          }));

          setReports(translatedReports); 

        } else {
          throw new Error('Formato de respuesta incorrecto');
        }

      } catch (err) {
        console.error("Error conectando a la API:", err);
        setError((err as Error).message); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchReports();
  }, []); 

  return (
    <div className="min-h-screen bg-white pb-20 flex flex-col">
      <main className="flex-grow">
        <div className="px-4 space-y-4">
          {isLoading ? (
            <p className="text-center text-gray-500">Cargando mis reportes...</p>
          ) : error ? (
            <p className="text-center text-red-500">{error}</p>
          ) : reports.length === 0 ? (
            <p className="text-center text-gray-500">No has creado ningún reporte aún.</p>
          ) : (
            reports.map((report) => (
              <ReportCard Readonly
                key={report.folio}
                folio={report.folio}
                ubicacion={report.ubicacion}
                caso={report.caso}
                status={report.status}
              />
            ))
          )}
        </div>
      </main>

      {/* Footer del Monito */}
      <div className="text-center space-y-4 pt-8 pb-4">
      </div>
    </div>
  );
};

export default ReportsView;