import React, { useState, useEffect } from 'react';
import CampaignCard from '../../Components/CampaignCard/CampaignCard';
import './campaigns.css';
import { toast } from 'react-hot-toast';
import { FaMapMarkerAlt, FaCalendarAlt, FaPhone } from "react-icons/fa"; // Importamos los iconos
import { Link } from 'react-router-dom'; // Para el link en el modal (si lo quieres)

const API_URL = "http://localhost:5093";

// 1. ARREGLO DE IMÁGENES DE REEMPLAZO (FALLBACKS)
const FALLBACK_BANNERS = [
  "https://images.unsplash.com/photo-1572978396564-9ae88ac166a9?q=80&w=600", // Botellas
  "https://images.unsplash.com/photo-1542601906990-b4d3fb7d5763?q=80&w=600", // Plantando árbol
  "https://images.unsplash.com/photo-1618477461853-5f8dd68aa395?q=80&w=600", // Playa limpia
  "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=600", // Voluntariado
  "https://images.unsplash.com/photo-1595278069441-2cf99f8005a9?q=80&w=600", // Icono de reciclaje
];

// Helper para tomar una imagen al azar
const getRandomBanner = () => {
  const index = Math.floor(Math.random() * FALLBACK_BANNERS.length);
  return FALLBACK_BANNERS[index];
};


// ----------------------------------------------------
// ... (Tus interfaces Campaign y ApiResponse van aquí)
// ----------------------------------------------------
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
// ----------------------------------------------------


const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);


  const getFullImageUrl = (path?: string) => {
    if (!path) return getRandomBanner(); // 2. Si el banner es nulo, asigna uno aleatorio
    // Si la URL es relativa, le pegamos el host.
    return path.startsWith('http') ? path : `${API_URL}${path}`;
  };

  // Función que llama al endpoint de detalles (se mantiene)
  const fetchDetails = async (campaignId: number) => {
    setIsDetailLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/campaigns/${campaignId}`);
      if (!response.ok) throw new Error("Error al cargar detalles");
      const data = await response.json();
      // Guardamos el objeto completo (que debería incluir todos los campos del modelo)
      setSelectedCampaign(data.dataObject);
    } catch (error) {
      toast.error("Error al cargar los detalles de la campaña");
      setSelectedCampaign(null);
    } finally {
      setIsDetailLoading(false);
    }
  };

  const handleOpenDetails = (campaign: Campaign) => {
    // Cuando hacen clic, cargamos los detalles completos antes de abrir el modal
    fetchDetails(campaign.id);
  };

  const handleCloseModal = () => setSelectedCampaign(null);


  // ----------------------
  // USE EFFECT (Fetch Inicial)
  // ----------------------
  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${API_URL}/api/campaigns`);
        if (!response.ok) throw new Error("Error al cargar campañas");
        const fullResponse: ApiResponse = await response.json();

        if (fullResponse && Array.isArray(fullResponse.listDataObject)) {
          // 3. La clave es el check 'Array.isArray' aquí, porque el backend
          // a veces devuelve un array en el nivel superior (si no hay paginación)
          setCampaigns(fullResponse.listDataObject);
        } else if (fullResponse && fullResponse.listDataObject) {
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
              iconSrc={
                campaign.banner ? campaign.banner : "/default_campaign_icon.jpg"
              } //! Imagen por defecto si no hay banner
              altText={campaign.name}
              title={campaign.name}
              institution={campaign.institution}
              onParticipate={() => handleOpenDetails(campaign)} // Abrir el modal cargando detalles
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

            {/* Contenido del modal: se ve si está cargando o no */}
            {isDetailLoading ? (
              <div className="flex justify-center items-center h-48 py-5">
                <p className="text-gray-500">Cargando detalles...</p>
              </div>
            ) : (
              <>
                {/* Imagen Grande */}
                <img
                  src={
                    selectedCampaign.banner
                      ? selectedCampaign.banner
                      : "/default_campaign_icon.jpg"
                  } //! Imagen por defecto si no hay banner
                  alt={selectedCampaign.name}
                  className="modal-header-image"
                />

                {/* Cuerpo del Modal */}
                <div className="modal-body">
                  <h2 className="text-xl font-bold text-gray-800 mb-1">{selectedCampaign.name}</h2>
                  <p className="text-sm text-green-600 font-semibold mb-4">{selectedCampaign.institution}</p>

                  <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                    {selectedCampaign.description}
                  </p>

                  {/* Detalles Extra */}
                  <div className="bg-gray-50 p-3 rounded-lg space-y-2">
                    <div className="modal-info-row">
                      <FaMapMarkerAlt className="text-green-600" />
                      <span>{selectedCampaign.township}</span>
                    </div>
                    <div className="modal-info-row">
                      <FaCalendarAlt className="text-green-600" />
                      <span>{selectedCampaign.startDate.split("T")[0]} - {selectedCampaign.endDate.split("T")[0]}</span>
                    </div>
                    <div className="modal-info-row">
                      <FaPhone className="text-green-600" />
                      <span>{selectedCampaign.contact}</span>
                    </div>
                    <div className="modal-info-row">
                      <FaPhone className="text-green-600" />
                      <span>Actividades: {selectedCampaign.activities}</span>
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