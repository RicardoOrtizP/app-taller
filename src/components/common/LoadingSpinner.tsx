import { HashLoader } from "react-spinners";
import { ClipLoader } from "react-spinners";
export const LoadingSpinner = ({
  fullPage = true,
  message = "Cargando...",
}) => {
  return (
    <div
      className={`flex items-center justify-center w-full p-8 ${
        fullPage
          ? "fixed inset-0 w-screen h-screen bg-white/85 backdrop-blur-sm z-50"
          : ""
      }`}
      role="status"
    >
      <div className="flex flex-col items-center gap-3">
        <div className="w-12 h-12 border-4 border-slate-200 border-t-blue-600 rounded-full animate-spin" />
        {message && (
          <p className="text-slate-600 text-sm font-medium">{message}</p>
        )}
      </div>
      <span className="sr-only">Cargando contenido...</span>
    </div>
  );
};
