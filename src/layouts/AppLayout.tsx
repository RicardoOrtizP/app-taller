import {
  ArrowLeftToLine,
  ArrowRightToLine,
  BookA,
  Contact,
  FileClock,
  Gauge,
  Kanban,
  Menu,
  MenuIcon,
  Tags,
  Users,
  Van,
  X,
} from "lucide-react";
import { useState } from "react";
import {
  Navigate,
  NavLink,
  Outlet,
  useLocation,
  useNavigate,
} from "react-router-dom";

export const AppLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [desktopCollapsed, setDesktopCollapsed] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    console.log("Cerrar sesión");
  };
  // Enlaces de navegacion principal
  const navigation = [
    { name: "Dashboard", href: "/dashboard", icon: Gauge },
    { name: "Tablero", href: "/boards", icon: Kanban },
    { name: "Entregas Hoy", href: "/today", icon: Van },
    { name: "Pedidos", href: "/orders", icon: BookA },
    { name: "Historial", href: "/history", icon: FileClock },
    { name: "Clientes", href: "/clients", icon: Contact },
    { name: "Usuarios", href: "/users", icon: Users },
    { name: "Catálogo", href: "/catalog", icon: Tags },
  ];

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-300">
      {/* ---------------------------------------------------- */}
      {/* 1. OVERLAY MÓVIL                                    */}
      {/* ---------------------------------------------------- */}
      {mobileMenuOpen && (
        <div
          className="fixed inset-0 z-40 bg-slate-900/60 backdrop-blur-sm lg:hidden"
          onClick={() => setMobileMenuOpen(false)}
        />
      )}

      {/* ---------------------------------------------------- */}
      {/* 2. SIDEBAR (Ancho adaptativo en PC: w-64 vs w-20)     */}
      {/* ---------------------------------------------------- */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800 flex flex-col justify-between transition-all duration-300 ease-in-out
          ${/* Comportamiento Móvil */ ""}
          ${mobileMenuOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0
          ${/* Comportamiento Escritorio */ ""}
          ${desktopCollapsed ? "lg:w-20" : "lg:w-64"}
        `}
      >
        <div className="flex flex-col flex-1 min-h-0">
          {/* Header Sidebar / Logo */}
          <div className="h-16 flex items-center justify-between px-4 border-b border-slate-100 ">
            <div
              className={`flex items-center gap-3 overflow-hidden ${desktopCollapsed ? "lg:justify-center lg:w-full" : ""}`}
            >
              <div className="w-10 h-10 rounded-xl bg-indigo-600 flex items-center justify-center text-white font-bold text-lg shadow-md shadow-indigo-600/30 shrink-0">
                M
              </div>
              {!desktopCollapsed && (
                <span className="text-lg font-bold tracking-tight text-slate-900 dark:text-white truncate lg:block">
                  MiAplicación
                </span>
              )}
            </div>

            {/* Botón cerrar para vista móvil */}
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="lg:hidden p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Menú de Navegación */}
          <nav className="p-3 space-y-1.5 flex-1 overflow-y-auto">
            {!desktopCollapsed && (
              <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                Menú Principal
              </p>
            )}

            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.name}
                  to={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={({ isActive }) =>
                    `group relative flex items-center gap-3.5 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-colors ${
                      desktopCollapsed ? "lg:justify-center" : ""
                    } ${
                      isActive
                        ? "bg-indigo-50 dark:bg-indigo-950/50 text-indigo-600 dark:text-indigo-400"
                        : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-white"
                    }`
                  }
                >
                  <Icon className="w-5 h-5 shrink-0" />

                  {/* Texto visible solo si el Sidebar NO está colapsado en PC */}
                  {!desktopCollapsed && (
                    <span className="truncate">{item.name}</span>
                  )}

                  {/* TOOLTIP: Se activa en Hover únicamente cuando el Sidebar está colapsado en PC */}
                  {desktopCollapsed && (
                    <div className="hidden lg:group-hover:flex fixed left-20 ml-2 px-3 py-1.5 bg-slate-900 text-white text-xs font-semibold rounded-lg shadow-xl whitespace-nowrap z-50 items-center pointer-events-none dark:bg-slate-100 dark:text-slate-900">
                      {item.name}
                      {/* Flechita apuntando a la izquierda */}
                      <span className="absolute -left-1 top-1/2 -translate-y-1/2 border-y-4 border-y-transparent border-r-4 border-r-slate-900 dark:border-r-slate-100" />
                    </div>
                  )}
                </NavLink>
              );
            })}

            {/* Módulo Admin
            {user?.role === "ADMIN" && (
              <div className="pt-3 mt-3 border-t border-slate-100 dark:border-slate-800 space-y-1.5">
                {!desktopCollapsed && (
                  <p className="px-3 text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-2">
                    Administración
                  </p>
                )}
              </div>
            )} */}
          </nav>
        </div>

        {/* Footer Sidebar / Avatar de Usuario */}
        <div className="p-3 border-t border-slate-100 ">
          <div
            className={`flex items-center gap-3 p-2 rounded-xl bg-slate-50 dark:bg-slate-800/50 ${desktopCollapsed ? "lg:justify-center" : ""}`}
          >
            <div className="w-9 h-9 rounded-full bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-300 font-semibold flex items-center justify-center text-sm shrink-0">
              U
            </div>
            {!desktopCollapsed && (
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                  "Usuario"
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  "usuario@ejemplo.com"
                </p>
              </div>
            )}
          </div>
        </div>
      </aside>

      {/* ---------------------------------------------------- */}
      {/* 3. ÁREA CONTENEDORA (Padding-left adaptativo en PC) */}
      {/* ---------------------------------------------------- */}
      <div
        className={`flex flex-col min-h-screen transition-all duration-300 ease-in-out ${
          desktopCollapsed ? "lg:pl-20" : "lg:pl-64"
        }`}
      >
        {/* Navbar Superior */}
        <header className="sticky top-0 z-30 h-16 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md border-b border-slate-200/80 dark:border-slate-800 px-4 sm:px-6 flex items-center justify-between">
          <div className="flex items-center gap-3">
            {/* Toggle para Abrir Menú Móvil */}
            <button
              onClick={() => setMobileMenuOpen(true)}
              className="lg:hidden p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800"
            >
              <MenuIcon className="w-6 h-6" />
            </button>

            {/* Toggle para Colapsar / Expandir Sidebar en ESCRITORIO */}
            <button
              onClick={() => setDesktopCollapsed(!desktopCollapsed)}
              className="hidden lg:flex p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
              title={desktopCollapsed ? "Expandir menú" : "Colapsar menú"}
            >
              <ArrowLeftToLine
                className={`w-5 h-5 transition-transform duration-300 ${desktopCollapsed ? "rotate-180" : ""}`}
              />
            </button>

            {/* Título de Sección Actual */}
            <h2 className="text-base font-semibold capitalize text-slate-800 dark:text-slate-200 ml-1">
              {location.pathname.replace("/", "").replace("-", " ") ||
                "Dashboard"}
            </h2>
          </div>

          {/* Menú Superior Derecho */}
          <div className="flex items-center gap-3">
            <div className="relative">
              <button
                onClick={() => setUserMenuOpen(!userMenuOpen)}
                className="flex items-center gap-2 p-1 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors focus:outline-none"
              >
                <div className="w-9 h-9 rounded-full bg-indigo-600 text-white font-semibold flex items-center justify-center text-sm shadow-sm">
                  R
                </div>
              </button>

              {userMenuOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setUserMenuOpen(false)}
                  />
                  <div className="absolute right-0 mt-2 w-52 z-50 bg-white dark:bg-slate-900 rounded-2xl shadow-xl border border-slate-100 dark:border-slate-800 py-2 animate-fade-in">
                    <div className="px-4 py-2.5 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-semibold text-slate-900 dark:text-white truncate">
                        usuario
                      </p>
                      <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                        user@email.com
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        setUserMenuOpen(false);
                        navigate("/profile");
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
                    >
                      Mi Perfil
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-rose-600 dark:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
                    >
                      Cerrar Sesión
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </header>

        {/* Contenido Principal */}
        <main className="flex-1 p-4 sm:p-6 lg:p-6 max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
};
