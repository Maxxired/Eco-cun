import React from 'react';
import './CampaignCard.css';

interface CampaignCardProps {
  iconSrc: string;
  altText: string;
  title: string;
  institution: string;
  onParticipate: () => void; 
}

const CampaignCard: React.FC<CampaignCardProps> = ({ iconSrc, altText, title, institution, onParticipate }) => {
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
      <div className="text-center mb-4 px-2 mt-4">
        <h3 className="text-gray-900 font-bold text-lg leading-tight">{title}</h3>
        <p className="text-gray-600 text-xs opacity-90 mt-1">{institution}</p>
      </div>

      {/* PUNTOS */}
      <div className="card-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>

      {/* BOTÓN */}
      <button 
        className="participate-button"
        onClick={onParticipate}
      >
        Ver Detalles <span className="arrow"> &gt;</span>
      </button>
    </div>
  );
};

export default CampaignCard;