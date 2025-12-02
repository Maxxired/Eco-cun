import React, { useState, useEffect } from "react";
import CampaignCard from "../../Components/CampaignCard/CampaignCard";
import { toast } from "react-hot-toast";
import { FaMapMarkerAlt, FaCalendarAlt, FaPhone } from "react-icons/fa";

const API_URL = "http://localhost:5093";

// TUS IMÁGENES LOCALES
const FALLBACK_IMAGES = [
  "/Arbol.jpg", "/Basura.jpg", "/Playa.jpg", "/Reciclaje.jpg", 
  "/Recilaton.jpg", "/Transforma-recolecta.jpg", "/Jornada-verde.jpg", "/PlayaReci.jpg"
];

interface Campaign { id: number; name: string; description: string; institution: string; township: string; location: string; startDate: string; endDate: string; banner?: string; activities: string; contact: string; active: boolean; }

interface ApiResponse { message: string; statusCode: number; listDataObject: Campaign[]; pagination: { page: number; limit: number; totalPages: number; }; }

const Campaigns: React.FC = () => {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [isDetailLoading, setIsDetailLoading] = useState(false);

  const getCampaignImage = (campaign: Campaign) => {
    if (campaign.banner && campaign.banner.length > 5) return campaign.banner.startsWith('http') ? campaign.banner : `${API_URL}${campaign.banner}`;
    return FALLBACK_IMAGES[campaign.id % FALLBACK_IMAGES.length];
  };

  // 🔥 Bloquear scroll
  useEffect(() => {
    if (selectedCampaign) document.body.style.overflow = 'hidden';
    else document.body.style.overflow = 'unset';
    return () => { document.body.style.overflow = 'unset'; };
  }, [selectedCampaign]);

  useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const response = await fetch(`${API_URL}/api/campaigns/all`);
        if (!response.ok) throw new Error("Error");
        const fullResponse: ApiResponse = await response.json();
        if (Array.isArray(fullResponse)) setCampaigns(fullResponse);
        else if (fullResponse.listDataObject) setCampaigns(fullResponse.listDataObject);
      } catch (error) { console.error("Error:", error); } finally { setIsLoading(false); }
    };
    fetchCampaigns();
  }, []);

  const handleOpenDetails = async (campaign: Campaign) => {
    setIsDetailLoading(true);
    setSelectedCampaign(campaign); 
    try {
      const response = await fetch(`${API_URL}/api/campaigns/${campaign.id}`);
      if (response.ok) {
        const data = await response.json();
        if (data.dataObject) setSelectedCampaign(data.dataObject);
        else if (data.id) setSelectedCampaign(data);
      }
    } catch (error) { console.error(error); } finally { setIsDetailLoading(false); }
  };

  return (

    <div className="relative w-full min-h-screen bg-gradient-to-br from-[#ffffff] via-[#d1eddf] to-[#ffffff] pb-24 -mt-6 pt-8 px-4">
      
      <div className="text-center mb-8">
        <h1 className="text-3xl font-extrabold text-[#1a7f4c] drop-shadow-sm">Campañas Disponibles</h1>
        <p className="text-sm text-gray-600 mt-1">Iniciativas para un mejor Quintana Roo</p>
      </div>

      <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 w-full max-w-5xl mx-auto">
        {isLoading ? (
          <p className="text-center text-gray-400 w-full col-span-full py-10">Cargando iniciativas...</p>
        ) : (
          campaigns.map((campaign) => (
            <CampaignCard
              key={campaign.id}
              iconSrc={getCampaignImage(campaign)} 
              altText={campaign.name}
              title={campaign.name}
              institution={campaign.institution}
              onParticipate={() => handleOpenDetails(campaign)}
            />
          ))
        )}
      </div>

      {/* --- MODAL CON ESTILO ANTERIOR (Limpiio y Verde) --- */}
      {selectedCampaign && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex justify-center items-center p-4 z-[1000]" onClick={() => setSelectedCampaign(null)}>
          
          {/* Tarjeta Modal estilo Home/Ecocun */}
          <div className="bg-white w-full max-w-sm rounded-2xl shadow-2xl overflow-hidden relative transform transition-all" onClick={(e) => e.stopPropagation()}>
            
            {/* Botón Cerrar */}
            <button className="absolute top-3 right-3 bg-black/40 text-white rounded-full p-1 hover:bg-black/60 z-10 w-8 h-8 transition-colors" onClick={() => setSelectedCampaign(null)}>✕</button>
            
            {/* Imagen (Header) */}
            <div className="h-52 w-full relative">
                <img src={getCampaignImage(selectedCampaign)} alt={selectedCampaign.name} className="w-full h-full object-cover"/>
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
            </div>

            {/* Contenido */}
            <div className="p-6 -mt-12 relative">
                {/* Título Flotante sobre la imagen */}
                <div className="bg-white p-4 rounded-xl shadow-lg mb-4 text-center">
                    <h2 className="text-xl font-bold text-gray-800 leading-tight mb-1">{selectedCampaign.name}</h2>
                    <span className="text-xs font-bold text-[#1a7f4c] uppercase tracking-wide">{selectedCampaign.institution}</span>
                </div>

                <p className="text-gray-600 text-sm mb-6 leading-relaxed text-center">
                    {selectedCampaign.description}
                </p>
                
                {/* Detalles en Grid */}
                <div className="grid gap-3 text-sm">
                    <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg text-gray-700">
                        <FaMapMarkerAlt className="text-green-600 text-lg shrink-0" />
                        <span className="font-medium">{selectedCampaign.township}</span>
                    </div>
                    <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg text-gray-700">
                        <FaCalendarAlt className="text-green-600 text-lg shrink-0" />
                        <span>{selectedCampaign.startDate?.split("T")[0]} - {selectedCampaign.endDate?.split("T")[0]}</span>
                    </div>
                    {selectedCampaign.contact && (
                        <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg text-gray-700">
                            <FaPhone className="text-green-600 text-lg shrink-0" />
                            <span>{selectedCampaign.contact}</span>
                        </div>
                    )}
                </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Campaigns;