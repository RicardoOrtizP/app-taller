import { Eye, EyeClosed } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router-dom";

export const RegisterPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  return (
    <div className="w-full space-y-6">
      <div className="relative flex items-center gap-2 mt-2">
        <span className="h-1.5 w-16 rounded-full bg-cyan-400" />
        <span className="h-1.5 w-8 rounded-full bg-fuchsia-600" />
        <span className="h-1.5 w-4 rounded-full bg-yellow-400" />
        <span className="h-1.5 w-2 rounded-full bg-gray-950" />
      </div>

      <div className="text-center">
        <h1 className="text-2xl font-bold text-slate-900">Registrar Usuario</h1>
        <p className="text-sm text-slate-500 mt-1">
          Registra tus datos de usuario
        </p>
      </div>

      <form className="flex flex-col gap-4 px-2.5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="name" className="text-sm font-medium text-slate-700">
            Nombre completo
          </label>
          <input
            type="text"
            name="name"
            id="name"
            placeholder="Nombre completo"
            required
            className="w-full px-3.5 py-2 border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-medium text-slate-700">
            Correo electrónico
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                />
              </svg>
            </div>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="usuario@mail.com"
              required
              className="w-full pl-10 pr-11 py-2 border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
          </div>
        </div>
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="password"
            className="text-sm font-medium text-slate-700"
          >
            Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              id="password"
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-11 py-2 border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
            >
              {showPassword ? <EyeClosed /> : <Eye />}
            </button>
          </div>
        </div>

        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="confirm_password"
            className="text-sm font-medium text-slate-700"
          >
            Confirmar Contraseña
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.8"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
            </div>
            <input
              type={showConfirmPassword ? "text" : "password"}
              name="confirm_password"
              id="confirm_password"
              required
              placeholder="••••••••"
              className="w-full pl-10 pr-11 py-2 border border-slate-300 rounded-md text-slate-800 text-sm focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-100"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 focus:outline-none"
            >
              {showConfirmPassword ? <EyeClosed /> : <Eye />}
            </button>
          </div>
        </div>

        <button
          type="submit"
          className="w-full mb-3 mt-2 py-2.5 bg-cyan-400 hover:bg-cyan-600 disabled:opacity-70 text-white font-medium rounded-md text-sm transition-colors"
        >
          Registrar usuario
        </button>
      </form>
      {/*Footer */}
      <div className="my-2 mx-2">
        <span className="text-sm font-medium text-slate-700">
          ¿Ya tienes cuenta?
        </span>{" "}
        <Link to="/login" className="text-sm text-blue-600 hover:underline">
          Ir a login
        </Link>
      </div>
    </div>
  );
};
