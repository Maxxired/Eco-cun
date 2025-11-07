const RegisterWindow = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Logo */}
      <img src="/logo_verde.png" alt="Ecocun Logo" className="h-50 mb-4" />

      {/* Formulario */}
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="nombre"
              className="block text-sm font-medium text-gray-700"
            >
              Nombre:
            </label>
            <input
              type="text"
              id="nombre"
              placeholder="Escribir nombre"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="apellidos"
              className="block text-sm font-medium text-gray-700"
            >
              Apellidos:
            </label>
            <input
              type="text"
              id="apellidos"
              placeholder="Escribir apellidos"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="correo"
              className="block text-sm font-medium text-gray-700"
            >
              Correo Electrónico:
            </label>
            <input
              type="email"
              id="correo"
              placeholder="Escribir correo"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña:
            </label>
            <input
              type="password"
              id="password"
              placeholder="Escribir contraseña"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacidad"
              className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
            />
            <label htmlFor="privacidad" className="ml-2 text-sm text-gray-700">
              He leído y acepto los{" "}
              <a href="/privacidad" className="text-green-700 underline">
                términos de privacidad
              </a>
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
          >
            Registrarse
          </button>
        </form>
      </div>

      {/* Icono inferior */}
      <div className="mt-8">
        <img
          src="/icono_usuario.png"
          alt="Usuario"
          className="h-6 opacity-50"
        />
      </div>
    </div>
  );
};

export default RegisterWindow;
