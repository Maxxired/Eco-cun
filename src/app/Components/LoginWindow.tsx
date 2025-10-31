const LoginWindow = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Logo */}
      <img src="/logo_verde.png" alt="Ecocun Logo" className="h-24 mb-4" />
      <h1 className="text-3xl font-bold text-green-700 mb-6 tracking-wide">
        ECOCUN
      </h1>

      {/* Formulario */}
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <form className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo
            </label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@ejemplo.com"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
          >
            Comenzar
          </button>
        </form>

        <div className="mt-4 text-center">
          <a
            href="/recuperar"
            className="text-sm text-green-700 hover:underline"
          >
            ¿Olvidaste tu contraseña?
          </a>
        </div>
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

export default LoginWindow;
