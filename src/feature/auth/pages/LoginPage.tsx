import { useState, type ChangeEvent, type FormEvent } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

export const LoginPage = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const login = (email: string, pass: string) => {};
  const navigate = useNavigate();
  const location = useLocation();

  // Obtiene la ruta de origen si venia redirigido por ruta protegida
  const from = location?.state?.from?.pathname || "/dashboard";

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    if (error) setError("");
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    try {
      // Llamada al método login desde AuthContext
      await login(formData.email, formData.password);
      // Redirige a la ubicación intentada previamente o a /dashboard
      navigate(from, { replace: true });
    } catch (error: any) {
      setError(error.message || "Credenciales inválidas. Inténtalo de nuevo.");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="w-full space-y-6">
      <div className="relative flex items-center gap-2 mt-2">
        <span className="h-1.5 w-16 rounded-full bg-cyan-400" />
        <span className="h-1.5 w-8 rounded-full bg-fuchsia-600" />
        <span className="h-1.5 w-4 rounded-full bg-yellow-400" />
        <span className="h-1.5 w-2 rounded-full bg-gray-950" />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Iniciar Sesión</h1>
        <p className="text-sm text slate-500 mt-1">
          Ingresa tus datos para acceder a tu cuenta.
        </p>
      </div>
      {/* Error */}
      {error && (
        <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-md text-sm mx-2">
          {error}
        </div>
      )}

      {/* formulario */}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-2.5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Correo electrónico
          </label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="usuario@mail.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2 border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <div className="flex justify-between items-center">
            <label
              htmlFor="password"
              className="text-sm font-medium text-slate-700"
            >
              Contraseña
            </label>
            <Link
              to="/forgot-password"
              className="text-xs text-blue-600 hover:underline"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          <input
            type="password"
            name="password"
            id="password"
            placeholder="••••••••"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full px-3.5 py-2 border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="w-full mb-3 mt-2 py-2.5 bg-cyan-400 hover:bg-cyan-600 disabled:opacity-70 text-white font-medium rounded-md text-sm transition-colors"
        >
          {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
        </button>
      </form>

      {/*Footer */}
      <div className="my-2 mx-2">
        <span className="text-sm font-medium text-slate-700">
          ¿No tienes cuenta?
        </span>{" "}
        <Link to="/register" className="text-sm text-blue-600 hover:underline">
          Crear una cuenta
        </Link>
      </div>
    </div>
  );
};
