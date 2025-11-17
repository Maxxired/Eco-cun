import React, { useState, useEffect } from 'react';
import CampaignCard from '../../Components/CampaignCard/CampaignCard';
import './campaigns.css';
const API_URL = "http://localhost:5093";

interface Campaign {
  id: number;
  name: string;
  institution: string;
  description: string;
  banner: string; 
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

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${API_URL}/api/Campaigns`);

        if (!response.ok) {
          throw new Error('Error al cargar campañas');
        }

        const fullResponse: ApiResponse = await response.json();

        if (fullResponse && fullResponse.listDataObject) {
          setCampaigns(fullResponse.listDataObject);
        } else {
          throw new Error('La respuesta de la API no tiene el formato esperado');
        }

      } catch (error) {
        console.error("Error conectando a la API:", error);
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

        {/* 7. Muestra "Cargando..." o las tarjetas */}
        {isLoading ? (
          <p className="loading-message">Cargando campañas...</p>
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              iconSrc={campaign.banner}
              altText={campaign.name}
            />
          ))
        )}

      </div>
    </div>
  );
};

export default Campaigns;