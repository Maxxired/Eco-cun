import React, { useState, useEffect } from 'react';
import CampaignCard from '../../Components/CampaignCard/CampaignCard';
import './campaigns.css';
import { toast } from 'react-hot-toast'; 
import { FaMapMarkerAlt, FaCalendarAlt, FaClock } from 'react-icons/fa';

const API_URL = "http://localhost:5093"; 

interface Campaign {
  id: number;
  name: string;
  institution: string;
  description: string;
  banner: string;
  township?: string;
  openingTime?: string;
  closingTime?: string;
  days?: string[];
  locations?: string[];
}

interface ApiResponse {
  message: string;
  statusCode: number;
  listDataObject: Campaign[]; 
  pagination: {
    page: number;
    limit: number;
    totalPages: number;
  };
}

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const handleOpenDetails = (campaign: Campaign) => {
    setSelectedCampaign(campaign);
  };
  const handleCloseModal = () => {
    setSelectedCampaign(null);
  };

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${API_URL}/api/Campaigns`);
        if (!response.ok) throw new Error('Error al cargar campañas');
        const fullResponse: ApiResponse = await response.json();

        if (fullResponse && fullResponse.listDataObject) {
          setCampaigns(fullResponse.listDataObject);
        }
      } catch (error) {
        console.error("Error:", error);
        toast.error("Error al cargar las campañas");
      } finally {
        setIsLoading(false);
      }
    };

    fetchCampaigns();
  }, []);

  return (
    <div className="campaigns-view-container">
      <h1 className="campaigns-view-title">Campañas Disponibles</h1>
      
      <div className="campaigns-list">
        {isLoading ? (
          <p className="loading-message">Cargando campañas...</p>
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              iconSrc={campaign.banner}
              altText={campaign.name}
              title={campaign.name}
              institution={campaign.institution}
              onParticipate={() => handleOpenDetails(campaign)}
            />
          ))
        )}
      </div>

      {/* --- VENTANA FLOTANTE (MODAL) --- */}
      {selectedCampaign && (
        <div className="modal-overlay" onClick={handleCloseModal}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            
            {/* Botón Cerrar */}
            <button className="modal-close-btn" onClick={handleCloseModal}>✕</button>
            
            {/* Imagen Grande */}
            <img src={selectedCampaign.banner} alt={selectedCampaign.name} className="modal-header-image" />
            
            {/* Cuerpo del Modal */}
            <div className="modal-body">
              <h2 className="text-xl font-bold text-gray-800 mb-1">{selectedCampaign.name}</h2>
              <p className="text-sm text-green-600 font-semibold mb-4">{selectedCampaign.institution}</p>
              
              <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                {selectedCampaign.description}
              </p>

              <div className="bg-gray-50 p-3 rounded-lg">
                <div className="modal-info-row">
                  <FaMapMarkerAlt className="text-green-600" />
                  <span>{selectedCampaign.township}</span>
                </div>
                <div className="modal-info-row">
                  <FaCalendarAlt className="text-green-600" />
                  <span>{selectedCampaign.days ? selectedCampaign.days.join(", ") : "Fechas por definir"}</span>
                </div>
                <div className="modal-info-row">
                  <FaClock className="text-green-600" />
                  <span>{selectedCampaign.openingTime} - {selectedCampaign.closingTime}</span>
                </div>
              </div>

            </div>

          </div>
        </div>
      )}

    </div>
  );
};

export default Campaigns;