import React, { useState, useEffect } from "react";
import CampaignCard from "../../Components/CampaignCard/CampaignCard";
import "./campaigns.css";
import { toast } from "react-hot-toast";
import {
  FaMapMarkerAlt,
  FaCalendarAlt,
  FaClock,
  FaPhone,
} from "react-icons/fa";

const API_URL = "http://localhost:5093";

interface Campaign {
  id: number;
  name: string;
  description: string;
  institution: string;
  township: string;
  location: string;
  startDate: string;
  endDate: string;
  banner?: string;
  activities: string;
  contact: string;
  active: boolean;
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
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(
    null
  );
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${API_URL}/api/campaigns/all`);
        if (!response.ok) throw new Error("Error al cargar campañas");
        const fullResponse: ApiResponse = await response.json();

        if (Array.isArray(fullResponse)) {
          setCampaigns(fullResponse);
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

  const handleOpenDetails = async (campaign: Campaign) => {
    setIsDetailLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/campaigns/${campaign.id}`);
      if (!response.ok) throw new Error("Error al cargar detalles");
      const data: Campaign = await response.json();
      setSelectedCampaign(data);
    } catch (error) {
      console.error(error);
      toast.error("Error al cargar los detalles de la campaña");
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleCloseModal = () => setSelectedCampaign(null);

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
              iconSrc={
                campaign.banner ? campaign.banner : "/default_campaign_icon.png"
              } //! Imagen por defecto si no hay banner
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
            <button className="modal-close-btn" onClick={handleCloseModal}>
              ✕
            </button>

            {isDetailLoading ? (
              <p>Cargando detalles...</p>
            ) : (
              <>
                {/* Imagen Grande */}
                <img
                  src={
                    selectedCampaign.banner
                      ? selectedCampaign.banner
                      : "/default_campaign_banner.png"
                  } //! Imagen por defecto si no hay banner
                  alt={selectedCampaign.name}
                  className="modal-header-image"
                />

                {/* Cuerpo del Modal */}
                <div className="modal-body">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">
                    {selectedCampaign.name}
                  </h2>
                  <p className="text-sm text-green-600 font-semibold mb-4">
                    {selectedCampaign.institution}
                  </p>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {selectedCampaign.description}
                    {/* selectedCampaign.activities */}
                  </p>

                  <div className="bg-gray-50 p-3 rounded-lg">
                    <div className="modal-info-row">
                      <FaMapMarkerAlt className="text-green-600" />
                      <span>{selectedCampaign.township}</span>
                    </div>
                    <div className="modal-info-row">
                      <FaCalendarAlt className="text-green-600" />
                      <span>
                        {selectedCampaign.startDate.split("T")[0]} -{" "}
                        {selectedCampaign.endDate.split("T")[0]}
                      </span>
                    </div>
                    <div className="modal-info-row">
                      <FaPhone className="text-green-600" />
                      <span>{selectedCampaign.contact}</span>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;
