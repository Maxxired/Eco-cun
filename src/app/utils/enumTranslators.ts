import { ReportStatus } from "../Components/ReportCard/ReportCard";

export const mapCategoryToString = (category: number | string): string => {
  switch (category) {
    case 0: return "Basurero Clandestino";
    case "basureroClandestino": return "Basurero Clandestino";
    case 1: return "Quema de Basura";
    case "quemaDeBasura": return "Quema de Basura";
    case 2: return "Drenaje Obstruido";
    case "drenajeObstruido": return "Drenaje Obstruido";
    default: return "Otro";
  }
};

// ReportStatus
export const mapStatusToString = (status: number | string): ReportStatus => {
  switch (status) {
    case 0: return "Nuevo"; 
    case "underReview": return "Nuevo";
    case 2: return "En proceso";
    case "inProgress": return "En proceso";
    case 3: return "Resueltos";
    case "resolved": return "Resueltos";
    default: return "Desconocido";
  }
};