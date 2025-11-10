import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import ReportCard, { ReportCardProps } from '../../Components/ReportCard/ReportCard';
const monkeyLogo = "/monkeydev_logo_blanco_slogan.png";

// 3. Datos de ejemplo que SIMULAN venir de tu API
const dataFromBackend: ReportCardProps[] = [
  { folio: '0001', ubicacion: 'Bonfil', caso: 'Basurero Clandestino', status: 'Nuevo' },
];

const ReportsView: React.FC = () => {
  const [reports, setReports] = useState<ReportCardProps[]>([]); 
  useEffect(() => {
    setReports(dataFromBackend);
  }, []); 

  return (
    <div className="min-h-screen bg-white-100 pb-20 flex flex-col">
      <main className="flex-grow">
        
        {/*Buscador*/}
        <div className="p-4 pt-6">
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
              <FaSearch className="w-5 h-5" />
            </span>
            <input 
              type="text" 
              placeholder="Buscar Folio del Reporte"
              className="w-full bg-gray-200 text-gray-800 rounded-lg p-3 pl-10 focus:outline-none focus:ring-2 focus:ring-[#228B4B]"
            />
          </div>
        </div>

        {/*Botones de Filtro*/}
        <div className="flex justify-around px-4 pb-4">
          <button className="text-sm bg-red-400 text-white px-4 py-1 rounded-full shadow hover:bg-red-500 transition-colors">
            Nuevo
          </button>
          <button className="text-sm bg-green-500 text-white px-4 py-1 rounded-full shadow hover:bg-green-600 transition-colors">
            En proceso
          </button>
          <button className="text-sm bg-indigo-500 text-white px-4 py-1 rounded-full shadow hover:bg-indigo-600 transition-colors">
            Resueltos
          </button>
        </div>

        <div className="px-4 space-y-4">
          {reports.map((report) => (
            <ReportCard 
              key={report.folio}
              folio={report.folio}
              ubicacion={report.ubicacion}
              caso={report.caso}
              status={report.status}
            />
          ))}
        </div>

      </main>
      
      <div className="text-center space-y-4 pt-8 pb-4"> 
        <div>
          <img src={monkeyLogo} alt="MonkeyDevs" className="h-16 mx-auto opacity-50" />
        </div>
      </div>

    </div>
  );
};

export default ReportsView;