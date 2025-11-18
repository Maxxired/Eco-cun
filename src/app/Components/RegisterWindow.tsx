import { useState } from "react";
import { api } from "../API/api.ts";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { toast } from "react-hot-toast";

function RegisterWindow() {
  const [nombre, setNombre] = useState("");
  const [apellidos, setApellidos] = useState("");
  const [correo, setCorreo] = useState("");
  const [password, setPassword] = useState("");
  const [aceptaPrivacidad, setAceptaPrivacidad] = useState(false);

  const navigate = useNavigate();

  //Envio del formularioooo
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!aceptaPrivacidad) {
      alert("Debes aceptar los términos de privacidad para continuar.");
      return;
    }

    const datosRegistro = {
      name: nombre,
      lastName: apellidos,
      email: correo,
      password: password,
    };

    try {
      const response = await api.post("/api/Auth/register", datosRegistro);
      const { message } = response.data;
      console.log("Login exitoso:", message);

      console.log("Usuario registrado:", response.data);

      toast.success("Registro exitoso");
      navigate("/iniciar_sesion");

      // Limpiar formulario
      setNombre("");
      setApellidos("");
      setCorreo("");
      setPassword("");
    } catch (error: any) {
      console.error("Error al registrar usuario:", error);
      toast.error("Este correo ya está registrado");
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      {/* Logo */}
      <img src="/logo_verde.png" alt="Ecocun Logo" className="h-50 mb-1" />

      {/* Formulario */}
      <div className="w-full max-w-sm bg-white shadow-lg rounded-xl p-6">
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <h1 className="block text-center text-2xl font-bold text-gray-700">
              Registro
            </h1>
          </div>
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
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
              value={apellidos}
              onChange={(e) => setApellidos(e.target.value)}
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
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-green-600 focus:border-green-600"
            />
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="privacidad"
              checked={aceptaPrivacidad}
              onChange={(e) => setAceptaPrivacidad(e.target.checked)}
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

      <div>
        <Toaster
          position="bottom-center"
          reverseOrder={false}
          toastOptions={{
            style: {
              fontSize: "18px", // más grande
              padding: "20px", // más espacio interno
              borderRadius: "10px",
              margin: "100px",
            },
            success: {
              style: {
                background: "#16a34a", // verde Ecocun
                color: "white",
              },
            },
            error: {
              style: {
                background: "#dc2626", // rojo para errores
                color: "white",
              },
            },
          }}
        />
      </div>
    </div>
  );
}

export default RegisterWindow;
