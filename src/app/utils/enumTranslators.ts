export const mapCategoryToString = (category: number | string): string => {
  switch (category) {
    case 0: return "Basurero Clandestino";
    case "BasureroClandestino": return "Basurero Clandestino";
    case 1: return "Quema de Basura";
    case "QuemaDeBasura": return "Quema de Basura";
    case 2: return "Drenaje Obstruido";
    case "DrenajeObstruido": return "Drenaje Obstruido";
    default: return "Otro";
  }
};

// ReportStatus
export const mapStatusToString = (status: number | string): string => {
  switch (status) {
    case 0: return "Nuevo"; 
    case "UnderReview": return "Nuevo";
    case 1: return "Pendiente";
    case "Pending": return "Pendiente";
    case 2: return "En proceso";
    case "InProgress": return "En proceso";
    case 3: return "Resueltos";
    case "Resolved": return "Resueltos";
    // ... (añade los otros)
    default: return "Desconocido";
  }
};