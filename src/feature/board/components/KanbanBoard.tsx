import { useEffect, useMemo, useRef, useState } from "react";
import { KanbanColumn } from "./KanbanColumn";
// import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/dist/types/adapter/element-adapter";
import { monitorForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Search } from "lucide-react";

// Función auxiliar para formatear cualquier fecha a YYYY-MM-DD local
const formatLocalDate = (date: Date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
};

// Fecha de hoy local
const todayDate = new Date();
const todayStr = formatLocalDate(todayDate);

// Fecha de ayer (vencida) local
const yesterdayDate = new Date();
yesterdayDate.setDate(todayDate.getDate() - 1);
const yesterdayStr = formatLocalDate(yesterdayDate);

// Fecha futura (+3 días) local
const futureDate = new Date();
futureDate.setDate(todayDate.getDate() + 3);
const futureStr = formatLocalDate(futureDate);
const initialColumns = [
  {
    id: "col-1",
    title: "Pendiente",
    color: "border-warning",
    items: [
      {
        id: "task-1",
        folio: "FOL-1001",
        content:
          "Diseñar interfaz en Figma con HeroUI,  este es el contenido mas largo para ver que tengo el estilo adecuado Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since 1966, when designers at Letraset and James Mosley, the librarian at St Bride Printing Library in London, took a 1914 Cicero translation and scrambled it to make dummy text for Letraset's Body Type sheets. It has survived not only many decades, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised thanks to these sheets and more recently with desktop publishing software like Aldus PageMaker and Microsoft Word including versions of Lorem Ipsum.",
        dueDate: todayStr,
        client: "Luis A. Gonzales",
        created_at: todayStr,
      },
      {
        id: "task-2",
        folio: "FOL-1002",
        content: "Configurar TailwindCSS y tema oscuro",
        dueDate: futureStr,
        client: "Gerardo. Gonzales",
        created_at: todayStr,
      },
    ],
  },
  {
    id: "col-2",
    title: "Diseño",
    color: "border-primary",
    items: [
      {
        id: "task-3",
        folio: "FOL-1003",
        content: "Implementar Pragmatic Drag and Drop",
        dueDate: yesterdayStr,
        client: "Gabriela Escobedo",
        created_at: todayStr,
      },
    ],
  },
  {
    id: "col-3",
    title: "Corte / impresion",
    color: "border-success",
    items: [
      {
        id: "task-4",
        folio: "FOL-1004",
        content: "Definir requerimientos del proyecto",
        dueDate: futureStr,
        client: "Luis Martinez.",
        created_at: todayStr,
      },
    ],
  },
  {
    id: "col-4",
    title: "Armado",
    color: "border-success",
    items: [],
  },
  {
    id: "col-5",
    title: "Listo P/ entrega",
    color: "border-blue-900",
    items: [],
  },
];
export const KanbanBoard = () => {
  const [columns, setColumns] = useState(initialColumns);
  // Termino de busqueda
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar tarjetas en tiempo real según el termino de busqueda
  const filteredColumns = useMemo(() => {
    const term = searchTerm.toLowerCase().trim();
    if (!term) return columns;

    return columns.map((col) => ({
      ...col,
      items: col.items.filter(
        (item) =>
          item.folio.toLowerCase().includes(term) ||
          item.client.toLowerCase().includes(term) ||
          item.content.toLowerCase().includes(term),
      ),
    }));
  }, [searchTerm, columns]);

  useEffect(() => {
    return monitorForElements({
      onDrop({ source, location }) {
        const destination = location.current.dropTargets[0];
        if (!destination) return;

        const sourceColumnId = source.data.columnId;
        const targetColumnId = destination.data.columnId;
        const taskId = source.data.taskId;

        console.log(
          `✨ Intentando mover tarea ${taskId} de ${sourceColumnId} a ${targetColumnId}`,
        );

        if (!sourceColumnId || !targetColumnId) return;
        if (sourceColumnId === targetColumnId) return;

        setColumns((prevColumns) => {
          let movedTask: any = null;

          // 1. Encontrar y extraer la tarea de la columna origen
          const cleanedColumns = prevColumns.map((col) => {
            if (col.id === sourceColumnId) {
              movedTask = col.items.find((item) => item.id === taskId);
              return {
                ...col,
                items: col.items.filter((item) => item.id !== taskId),
              };
            }
            return col;
          });

          if (!movedTask) {
            console.warn("⚠️ No se encontró la tarea a mover");
            return prevColumns;
          }

          // 2. Insertar la tarea en la columna destino
          const finalColumns = cleanedColumns.map((col) => {
            if (col.id === targetColumnId) {
              return {
                ...col,
                items: [...col.items, movedTask],
              };
            }
            return col;
          });

          //   console.log("📌 Nuevo estado de columnas:", finalColumns);
          return finalColumns;
        });
      },
    });
  }, []);

  return (
    <div className="p-4 bg-slate-50 flex flex-col">
      <div className="max-w-8xl mx-auto w-full flex-1 flex flex-col">
        {/* Cabecera con titulo y barra de busqueda */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-4">
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            Tablero de procesos
          </h1>
          {/* Input de busqueda moderno */}
          <div className="relative w-full sm:w-72">
            <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-slate-400">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
            </span>
            <input
              type="text"
              value={searchTerm}
              placeholder="Buscar por folio, cliente..."
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2 text-xs bg-white text-slate-900 border border-slate-200 rounded-xl shadow-2xs focus:outline-none focus:ring-2 focus:ring-slate-400 transition-all placeholder:text-slate-400"
            />
            {searchTerm && (
              <button
                type="button"
                onClick={() => setSearchTerm("")}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-slate-400 hover:text-slate-600"
              >
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            )}
          </div>
        </div>
      </div>
      {/* // Contenedor del tablero */}
      <div className="flex gap-1 overflow-x-auto pb-4 items-start scrollbar-thin scrollbar-thumb-slate-300 scrollbar-track-transparent hover:scrollbar-thumb-slate-400">
        {filteredColumns.map((column) => (
          <KanbanColumn key={column.id} column={column} />
        ))}
      </div>
    </div>
  );
};
