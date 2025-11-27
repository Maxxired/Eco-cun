import { useState } from "react";
import { api } from "../API/api.ts";
import { useNavigate } from "react-router-dom";

const LoginWindow = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // Evita recargar la página

    const datosReporte = {
      Email,
      Password,
    };

    try {
      const response = await api.post(
        "http://localhost:5093/api/auth/login",
        datosReporte
      );
      const { success, message, role, token, refreshToken, expiration } =
        response.data;

      localStorage.setItem("token", token);

      console.log("Success:", success);
      console.log("Message:", message);
      console.log("Role", role);
      console.log("Token:", token);
      console.log("Refresh Token:", refreshToken);
      console.log("Expiration:", expiration);
      if (success == true) {
        navigate("/");
      }
    } catch (error) {
      console.error("Error al iniciar sesión:", error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <img src="/logo_verde.png" alt="Ecocun Logo" className="h-24 mb-4" />

      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label
              htmlFor="Email"
              className="block text-sm font-medium text-gray-700"
            >
              Correo
            </label>
            <input
              type="email"
              id="e\\Email"
              placeholder="ejemplo@ejemplo.com"
              value={Email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <div>
            <label
              htmlFor="Password"
              className="block text-sm font-medium text-gray-700"
            >
              Contraseña
            </label>
            <input
              type="password"
              id="Password"
              value={Password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors"
          >
            <a>Comenzar</a>
          </button>
        </form>

        <div className="mt-4 text-center">
          <a
            href="/registro"
            className="text-sm text-green-700 hover:underline"
          >
            Registrate
          </a>
        </div>
      </div>
    </div>
  );
};

export default LoginWindow;
