import React from 'react';
import './CampaignCard.css'; 

interface CampaignCardProps {
  iconSrc: string;
  altText: string;
}

const CampaignCard: React.FC<CampaignCardProps> = ({ iconSrc, altText }) => {
  return (
    <div className="campaign-card">
      <div className="campaign-icon-container">
        <img src={iconSrc} alt={altText} className="campaign-icon" />
      </div>
      <div className="card-dots">
        <span className="dot active"></span>
        <span className="dot"></span>
        <span className="dot"></span>
      </div>
      <button className="participate-button">
        Participar <span className="arrow"> &gt;</span>
      </button>
    </div>
  );
};

export default CampaignCard;