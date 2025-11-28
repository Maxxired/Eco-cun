import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaTimes, FaImage, FaMapMarkedAlt } from 'react-icons/fa'; 
import { Link, useNavigate } from 'react-router-dom';
import ReportCard, { ReportCardProps } from '../../Components/ReportCard/ReportCard';
import { mapCategoryToString, mapStatusToString } from '../../utils/enumTranslators';

const API_URL = "http://localhost:5093"; 
interface ReportFromApi { id: number; userId: number; locLatitude: number; locLongitude: number; description: string; category: number | string; status: number | string; createdAt: string; imageUrl?: string; }

const AdminReportsView: React.FC = () => {
  const [reports, setReports] = useState<ReportCardProps[]>([]); 
  const [isLoading, setIsLoading] = useState(true);
  const [selectedReport, setSelectedReport] = useState<ReportCardProps | null>(null);
  const navigate = useNavigate();

  const getImageUrl = (path?: string) => path ? (path.startsWith('http') ? path : `${API_URL}${path}`) : null;

  useEffect(() => {
    const token = localStorage.getItem('token'); 
    fetch(`${API_URL}/api/reports/allreports?page=1&limit=100`, { headers: { 'Authorization': `Bearer ${token}` } })
      .then(res => res.json())
      .then(res => {
         if(res.data) {
             const mapped = res.data.map((r: ReportFromApi) => ({
                 folio: r.id.toString().padStart(4, '0'),
                 ubicacion: `${r.locLatitude.toFixed(4)}, ${r.locLongitude.toFixed(4)}`,
                 caso: mapCategoryToString(r.category),
                 status: mapStatusToString(r.status),
                 description: r.description,
                 imageUrl: getImageUrl(r.imageUrl),
                 lat: r.locLatitude, 
                 lon: r.locLongitude
             }));
             setReports(mapped);
         }
      })
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 pb-24 flex flex-col relative">
      <div className="bg-white p-4 shadow-sm sticky top-0 z-10 flex items-center">
        <Link to="/admin-profile" className="absolute left-4 text-gray-500 p-2"><FaArrowLeft size={20} /></Link>
        <h1 className="text-lg font-bold text-gray-800 w-full text-center">Gestión Global</h1>
      </div>

      <main className="flex-grow p-4">
        <div className="space-y-4">
          {isLoading ? <p className="text-center text-gray-500">Cargando...</p> : 
           reports.map(r => <ReportCard key={r.folio} {...r} onViewDetails={() => setSelectedReport(r)} />)}
        </div>
      </main>

      {selectedReport && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex justify-center items-center p-4 z-50" onClick={() => setSelectedReport(null)}>
          <div className="bg-white w-full max-w-sm rounded-2xl p-6 shadow-2xl" onClick={e => e.stopPropagation()}>
            <div className="flex justify-between mb-4"><h2 className="text-xl font-bold">Folio #{selectedReport.folio}</h2><button onClick={() => setSelectedReport(null)}><FaTimes /></button></div>
            <div className="mb-4 bg-gray-100 h-40 rounded-lg flex items-center justify-center overflow-hidden">
               {selectedReport.imageUrl ? <img src={selectedReport.imageUrl} className="w-full h-full object-cover"/> : <FaImage className="text-gray-400" size={30}/>}
            </div>
            <p className="font-bold text-green-700 mb-1">{selectedReport.caso}</p>
            <p className="text-gray-600 text-sm mb-4 italic">"{selectedReport.description}"</p>
            <button onClick={() => navigate('/maps', { state: { targetLat: selectedReport.lat, targetLng: selectedReport.lon } })} className="w-full bg-[#228B4B] text-white py-3 rounded-xl font-bold flex justify-center gap-2"><FaMapMarkedAlt/> Ver en Mapa</button>
          </div>
        </div>
      )}
    </div>
  );
};
export default AdminReportsView;