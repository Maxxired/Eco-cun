import React from 'react';
import './CampaignCard.css';

interface CampaignCardProps {
  iconSrc: string;
  altText: string;
  title: string;
  institution: string;
  onParticipate: () => void; 
}

const CampaignCard: React.FC<CampaignCardProps> = ({ iconSrc, altText, title, onParticipate }) => {
  const backgroundStyle = iconSrc ? { backgroundImage: `url("${iconSrc}")` } : {};

  return (
    <div className="campaign-card">
      {/* IMAGEN DE FONDO */}
      <div 
        className="campaign-image-background" 
        style={backgroundStyle}
        role="img" 
        aria-label={altText}
      >
      </div>

      {/* TEXTO */}
      <div className="text-center px-2">
        <h3 className="text-gray-900 font-bold text-lg leading-tight">{title}</h3>
      </div>

      {/* BOTÓN */}
      <button 
        className="participate-button"
        onClick={onParticipate}
      >
        Ver Detalles
      </button>
    </div>
  );
};

export default CampaignCard;