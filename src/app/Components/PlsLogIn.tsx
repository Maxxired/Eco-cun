const PlsLogIn = () => (
  <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
    <div className="bg-white w-72 rounded-xl p-4 shadow-lg text-center">
      <p className="text-gray-800 mb-4">
        Debes iniciar sesión para poder realizar un reporte
      </p>

      <button
        onClick={() => window.location.href = "/iniciar_sesion"}
        className="w-full bg-green-600 text-white py-2 rounded-lg"
      >
        Ir al inicio de sesión
      </button>
    </div>
  </div>
);

export default PlsLogIn;