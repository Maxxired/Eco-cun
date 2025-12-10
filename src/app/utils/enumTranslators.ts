export const mapCategoryToString = (category: number | string): string => {
  if (category === null || category === undefined) return "Otro";
  const val = category.toString().toLowerCase();

  if (val === "0" || val === "basureroclandestino") return "Basurero Clandestino";
  if (val === "1" || val === "quemadebasura") return "Quema de Basura";
  if (val === "2" || val === "drenajeobstruido") return "Drenaje Obstruido";
  if (val === "3" || val === "derramedesustanciaspeligrosas") return "Derrame de Sustancias";
  
  return "Otro";
};

export const mapStatusToString = (status: number | string): string => {
  if (status === null || status === undefined) return "Desconocido";
  const val = status.toString().toLowerCase();

  if (val === "0" || val === "underreview") return "Nuevo";
  if (val === "1" || val === "pending") return "Pendiente";
  if (val === "2" || val === "inprogress") return "En proceso";
  if (val === "3" || val === "resolved") return "Resuelto";
  if (val === "4" || val === "closed") return "Cerrado";
  if (val === "5" || val === "rejected") return "Rechazado";

  return "Desconocido";
};

export const getStatusColor = (statusLabel: string): string => {
  switch (statusLabel) {
    case "Nuevo": return "bg-red-500 text-white";
    case "Pendiente": return "bg-orange-400 text-white";
    case "En proceso": return "bg-blue-500 text-white";
    case "Resuelto": return "bg-green-600 text-white";
    case "Cerrado": return "bg-gray-600 text-white";
    case "Rechazado": return "bg-red-700 text-white";
    default: return "bg-gray-300 text-gray-700";
  }
};