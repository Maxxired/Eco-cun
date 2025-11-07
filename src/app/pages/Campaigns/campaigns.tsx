import React from 'react';

import CampaignCard from '../../Components/CampaignCard/CampaignCard';
import './campaigns.css';
const recyclingIcon = '/icons/recycling-icon.png';
const treeIcon = '/icons/tree-icon.png';
const Campaigns: React.FC = () => {
  return (
    <div className="campaigns-view-container">
      <h1 className="campaigns-view-title">Campañas Disponibles</h1>
      
      <div className="campaigns-list">
        {}
        <CampaignCard
          iconSrc={recyclingIcon} 
          altText="Icono"
        />
        
        {}
        <CampaignCard
          iconSrc={treeIcon}
          altText="Icono "
        />

        {}
        
      </div>
    </div>
  );
};

export default Campaigns;