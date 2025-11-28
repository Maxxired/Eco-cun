import { useState } from "react";
import { api } from "../API/api.ts";
import { Link, useNavigate } from "react-router-dom";

const parseJwt = (token: string) => {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
};

const LoginWindow = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const datosReporte = { email, password };

    try {
      const response = await api.post("/api/auth/logIn", datosReporte);
      const { message, token } = response.data;
      localStorage.setItem("token", token);
      const decodedToken = parseJwt(token);
      const userRole = decodedToken["role"] || decodedToken["http://schemas.microsoft.com/ws/2008/06/identity/claims/role"];

      console.log("Login exitoso:", message);
      console.log("Rol detectado:", userRole);
      localStorage.setItem("role", userRole); 
      
      if (userRole === "Admin") {
        navigate("/admin-profile");
      } else {
        navigate("/");
      }

    } catch (error) {
      console.error("Error al iniciar sesión:", error);
      alert("Credenciales incorrectas o error en el servidor.");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <img src="/logo_verde.png" alt="Ecocun Logo" className="h-24 mb-4" />

      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Correo
            </label>
            <input
              type="email"
              id="email"
              placeholder="ejemplo@ejemplo.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Contraseña
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-2 rounded-md hover:bg-green-800 transition-colors font-medium"
          >
            Comenzar
          </button>
        </form>

        <div className="mt-4 text-center">
          <Link to="/recuperar" className="text-sm text-green-700 hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>
        </div>
        <div className="mt-4 text-center">
          <Link to="/registro" className="text-sm text-green-700 hover:underline">
            Regístrate
          </Link>
        </div>
      </div>
    </div>
  );
};

export default LoginWindow;