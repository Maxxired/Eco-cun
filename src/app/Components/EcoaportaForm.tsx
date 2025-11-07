import { useState } from "react";

function EcoaportaForm() {
  const [comentarios, setComentarios] = useState("");
  const [anonimo, setAnonimo] = useState(false);
  const [longitud, setLongitud] = useState("");
  const [latitud, setLatitud] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault(); // Evita que se recargue la página

    // Aquí puedes guardar los datos, enviarlos a una API, etc.
    const datosReporte = {
      comentarios,
      anonimo,
      longitud,
      latitud,
    };

    console.log("Reporte enviado:", datosReporte);

    // Opcional: limpiar el formulario
    setComentarios("");
    setAnonimo(false);
    setLongitud("");
    setLatitud("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen flex flex-col items-center justify-center bg-white px-4 py-6"
    >
      <h1 className="text-2xl font-bold text-gray-800 mb-4">
        Realiza tu reporte
      </h1>

      {/* Mapa de OpenStreetMap, aqui ira cuando lo tenga:(((*/}
      <div className="w-full max-w-md mb-4">
        <img
          src="/mapa_cancun.png"
          alt="Mapa de ubicación"
          className="rounded-xl shadow-md w-full h-auto object-cover"
        />
      </div>

      {/* Botón Seleccionar */}
      <button
        type="button"
        className="w-full max-w-md bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors mb-6"
      >
        Seleccionar
      </button>

      {/* Comentarios */}
      <div className="w-full max-w-md mb-4">
        <label
          htmlFor="comentarios"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          Comentarios
        </label>
        <textarea
          id="comentarios"
          rows={4}
          placeholder="Datos de relevancia para proceder."
          value={comentarios}
          onChange={(e) => setComentarios(e.target.value)}
          className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600 resize-none"
        />
      </div>

      {/* Checkbox de anonimato */}
      <div className="w-full max-w-md flex items-center mb-6">
        <input
          type="checkbox"
          id="anonimo"
          checked={anonimo}
          onChange={(e) => setAnonimo(e.target.checked)}
          className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
        />
        <label htmlFor="anonimo" className="ml-2 text-sm text-gray-700">
          Reporte anónimo
        </label>
      </div>

      {/* Botón Enviar */}
      <button
        type="submit"
        className="w-full max-w-md bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
      >
        Enviar reporte
      </button>
    </form>
  );
}

export default EcoaportaForm;
