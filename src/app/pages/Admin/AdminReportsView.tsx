import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaMapMarkedAlt, FaTimes, FaImage } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom';
import ReportCard, { ReportCardProps } from '../../Components/ReportCard/ReportCard';
import { mapCategoryToString, mapStatusToString } from '../../utils/enumTranslators';

const API_URL = "http://localhost:5093"; 

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

const AdminReportsView: React.FC = () => {
  const [reports, setReports] = useState<ReportCardProps[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedReport, setSelectedReport] = useState<ReportCardProps | null>(null);
  
  const navigate = useNavigate();

  const getImageUrl = (path?: string) => {
    if (!path) return null;
    return path.startsWith('http') ? path : `${API_URL}${path}`;
  };

  const handleGoToMap = () => {
    if (selectedReport) {
      navigate('/mapa', { 
        state: { targetLat: selectedReport.lat, targetLng: selectedReport.lon } 
      });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    
    const fetchAllReports = async () => {
      try {
        // RUTA DE ADMIN: /allreports
        const response = await fetch(`${API_URL}/api/reports/allreports?page=1&limit=100`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });

        if (!response.ok) throw new Error('Error al cargar reportes globales');

        const fullResponse: ApiResponse = await response.json();

        if (fullResponse && fullResponse.data) {
          const translatedReports = fullResponse.data.map((report: ReportFromApi): ReportCardProps => ({
            folio: report.id.toString().padStart(4, '0'), 
            ubicacion: `Lat: ${report.locLatitude.toFixed(4)}, Lon: ${report.locLongitude.toFixed(4)}`,
            caso: mapCategoryToString(report.category),
            status: mapStatusToString(report.status),
            description: report.description,
            imageUrl: report.imageUrl,
            lat: report.locLatitude,
            lon: report.locLongitude
          }));
          setReports(translatedReports);
        } else {
            setReports([]);
        }
      } catch (err) {
        setError((err as Error).message); 
      } finally {
        setIsLoading(false); 
      }
    };

    fetchAllReports();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col relative">
      
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center justify-between">
        <Link 
            to="/admin-profile" 
            className="text-gray-500 hover:text-[#228B4B] p-2 -ml-2 rounded-full transition-colors"
        >
            <FaArrowLeft size={20} />
        </Link>
        <h1 className="text-lg font-bold text-gray-800 w-full text-center mr-8">
            Gestión de Reportes
        </h1>
      </div>

      <main className="flex-grow p-4 max-w-md mx-auto w-full">
        <div className="space-y-4">
          {isLoading ? (
             <p className="text-center text-gray-400 py-10">Cargando...</p>
          ) : error ? (
            <p className="text-center text-red-500 p-4">{error}</p>
          ) : reports.length === 0 ? (
            <p className="text-center text-gray-500 py-10">No hay reportes.</p>
          ) : (
            reports.map((report) => (
              <ReportCard 
                key={report.folio}
                {...report} 
                onViewDetails={() => setSelectedReport(report)} 
              />
            ))
          )}
        </div>
      </main>

      {selectedReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-[60]" onClick={() => setSelectedReport(null)}>
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden" onClick={(e) => e.stopPropagation()}>
            
            <div className="bg-gray-50 p-4 border-b border-gray-100 flex justify-between items-center">
              <div>
                  <span className="text-xs text-gray-500 font-bold">FOLIO</span>
                  <h2 className="text-2xl font-black text-gray-800">#{selectedReport.folio}</h2>
              </div>
              <button onClick={() => setSelectedReport(null)} className="text-gray-500 hover:text-red-500 p-2">
                <FaTimes size={20} />
              </button>
            </div>

            <div className="p-5">
                <div className="mb-4 bg-gray-100 rounded-lg h-40 flex items-center justify-center overflow-hidden">
                   {selectedReport.imageUrl ? (
                      <img src={getImageUrl(selectedReport.imageUrl) || ''} className="w-full h-full object-cover" alt="Evidencia" />
                   ) : (
                      <div className="flex flex-col items-center text-gray-400">
                         <FaImage size={30} className="mb-1" />
                         <span className="text-xs">Sin foto</span>
                      </div>
                   )}
                </div>

                <div className="space-y-3 text-sm">
                    <div>
                        <p className="text-xs font-bold text-gray-400">CATEGORÍA</p>
                        <p className="font-semibold text-gray-800">{selectedReport.caso}</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400">COMENTARIOS</p>
                        <p className="text-gray-600 italic bg-gray-50 p-2 rounded border border-gray-100">"{selectedReport.description}"</p>
                    </div>
                    <div>
                        <p className="text-xs font-bold text-gray-400 mb-1">ESTATUS</p>
                        <span className="bg-blue-50 text-blue-700 px-3 py-1 rounded-full border border-blue-200 font-bold text-xs">
                             {selectedReport.status}
                        </span>
                    </div>
                </div>

                <button 
                  onClick={handleGoToMap}
                  className="mt-5 w-full bg-[#228B4B] text-white font-bold py-3 rounded-xl shadow-lg flex items-center justify-center gap-2"
                >
                  <FaMapMarkedAlt /> Ver en Mapa
                </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminReportsView;