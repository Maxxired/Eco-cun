import React from 'react';
const TermsView: React.FC = () => {
  return (
    <div className="min-h-screen bg-white pb-20 flex flex-col">
    
      <main className="p-6 text-gray-800 text-sm overflow-y-auto flex-grow">
        <h1 className="text-2xl font-black text-gray-800 mb-6">Términos y Condiciones</h1>
        
        <h2 className="text-lg font-bold mb-2 text-[#228B4B]">1. Objeto de la Plataforma</h2>
        <p className="mb-4 text-justify">
          Ecocun es una herramienta digital desarrollada por <strong>MonkeyDevs</strong> para fomentar la participación ciudadana en el cuidado ambiental en Benito Juárez. Permite reportar incidentes y unirse a campañas.
        </p>

        <h2 className="text-lg font-bold mb-2 text-[#228B4B]">2. Uso de Reportes</h2>
        <p className="mb-4 text-justify">
          Al enviar un reporte, garantizas que la información es real. Otorgas a Ecocun permiso para mostrar la foto y ubicación en el mapa. Está prohibido subir contenido ofensivo o falso.
        </p>

        <h2 className="text-lg font-bold mb-2 text-[#228B4B]">3. Geolocalización</h2>
        <p className="mb-4 text-justify">
          La app usa tu GPS para ubicar los reportes. Al usarla, aceptas que usemos tus coordenadas exclusivamente para situar la incidencia en el mapa.
        </p>

        <h2 className="text-lg font-bold mb-2 text-[#228B4B]">4. Responsabilidad</h2>
        <p className="mb-4 text-justify">
          Ecocun es una herramienta de visibilización. No garantizamos la solución inmediata de los reportes por parte de las autoridades. Usas la app bajo tu propia responsabilidad.
        </p>

        <div className="mt-8 p-4 bg-gray-100 rounded-lg text-xs text-gray-500 text-center">
          <p>Última actualización: Noviembre 2025</p>
          <p>MonkeyDevs © Todos los derechos reservados.</p>
        </div>

      </main>
    </div>
  );
};

export default TermsView;