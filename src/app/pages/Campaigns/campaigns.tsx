import React, { useState, useEffect } from 'react';
import CampaignCard from '../../Components/CampaignCard/CampaignCard';
import './campaigns.css';
// 1. Importamos el toast
import { toast } from 'react-hot-toast'; 

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

  // 2. Función para manejar el clic en "Participar"
  const handleParticipate = (campaignName: string) => {
    // Aquí podrías llamar a una API para guardar el registro real en el futuro
    toast.success(`¡Te has inscrito a "${campaignName}"!`, {
      duration: 4000,
      position: 'top-center',
      style: {
        background: '#228B4B',
        color: '#fff',
      },
    });
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
        console.error("Error conectando a la API:", error);
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
              
              // 3. ¡PASAMOS LA FUNCIÓN!
              onParticipate={() => handleParticipate(campaign.name)}
            />
          ))
        )}
      </div>
    </div>
  );
};

export default Campaigns;