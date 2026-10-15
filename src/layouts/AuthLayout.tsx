import { Link, Outlet } from "react-router-dom";

export const AuthLayout = () => {
  return (
    <div className="flex flex-col justify-between items-center min-h-screen w-full p-6 bg-gradient-to-br from-slate-50 to-slate-200">
      {/* header */}
      <header className="w-full max-w-md flex justify-center pt-4">
        <Link
          to="/"
          className="text-2xl font-bold text-slate-800 tracking-tight  hover:text-blue-600 transition-colors"
        >
          MiApp
        </Link>
      </header>
      {/* Main card */}
      <main className="w-full max-w-md bg-white rounded-md p-2 my-0 border border-2 border-slate-100">
        <Outlet />
      </main>
      {/* footer */}
      <footer className="text-center text-xs text-slate-500 flex flex-col gap-2 pb-4">
        <p>
          &copy; {new Date().getFullYear()} MiApp. Todos los derechos
          reservados.
        </p>
        <div className="flex justify-center gap-2">
          <Link to="/privacy"></Link>
          <span>•</span>
          <Link to="/terms"></Link>
        </div>
      </footer>
    </div>
  );
};
