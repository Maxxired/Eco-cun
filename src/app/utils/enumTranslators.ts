export const mapCategoryToString = (category: number | string): string => {
  if (category === null || category === undefined) return "Otro";
  
  // Convertimos a string y a minúsculas para comparar sin errores
  const catStr = category.toString().toLowerCase();

  if (catStr === "0" || catStr === "basureroclandestino") return "Basurero Clandestino";
  if (catStr === "1" || catStr === "quemadebasura") return "Quema de Basura";
  if (catStr === "2" || catStr === "drenajeobstruido") return "Drenaje Obstruido";
  if (catStr === "3" || catStr === "derramedesustanciaspeligrosas") return "Derrame de Sustancias";
  
  return "Otro";
};

export const mapStatusToString = (status: number | string): string => {
  if (status === null || status === undefined) return "Desconocido";

  const statStr = status.toString().toLowerCase();

  if (statStr === "0" || statStr === "underreview") return "Nuevo";
  if (statStr === "1" || statStr === "pending") return "Pendiente";
  if (statStr === "2" || statStr === "inprogress") return "En proceso";
  if (statStr === "3" || statStr === "resolved") return "Resuelto";
  if (statStr === "4" || statStr === "closed") return "Cerrado";
  if (statStr === "5" || statStr === "rejected") return "Rechazado";

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