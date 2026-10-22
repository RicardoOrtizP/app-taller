import type React from "react";
import { useEffect, useRef, useState } from "react";
import { draggable } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import { Calendar, MoreVertical, TrendingUp } from "lucide-react";

interface DueDateStatus {
  label: string;
  cardClass: string;
  status: string;
  styleDueDate: string;
  badge: string;
  dot: string;
  border: string;
}
// Función para determinar el estado de la fecha
const getDueDateStatus = (dueDateString: string): DueDateStatus => {
  if (!dueDateString)
    return {
      label: "",
      cardClass: "",
      status: "",
      styleDueDate: "",
      badge: "",
      dot: "",
      border: "",
    };

  // 1. Fecha de hoy normalizada a medianoche local
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // 2. Descomponer la cadena YYYY-MM-DD y crear la fecha en la zona horaria local exacta
  const [year, month, day] = dueDateString.split("-").map(Number);
  const dueDate = new Date(year, month - 1, day, 0, 0, 0, 0);

  // Diferencia de tiempo en milisegundos
  const diffTime = dueDate.getTime() - today.getTime();
  // Convertir a días (redondeando para evitar desfases por cambio de horario de verano/zona)
  const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

  // Caso 1: Vence hoy
  if (diffDays === 0) {
    return {
      label: "Vence hoy",
      cardClass: "bg-amber-50/50 border-amber-100",
      status: "Vence hoy",
      styleDueDate: "text-sky-700",
      badge:
        "bg-amber-50 text-amber-700 border-amber-200/60 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/40",
      dot: "bg-amber-500",
      border: "border-l-amber-500",
    };
  }

  // Caso 2: Fecha vencida (diffDays es negativo)
  if (diffDays < 0) {
    const daysPassed = Math.abs(diffDays);
    return {
      label: `Retraso (${daysPassed}d)`,
      cardClass: "bg-rose-50/50 border-rose-100",
      status: "Retrasada",
      styleDueDate: "text-rose-700",
      badge:
        "bg-rose-50 text-rose-700 border-rose-200/60 dark:bg-rose-950/40 dark:text-rose-400 dark:border-rose-800/40",
      dot: "bg-rose-500 animate-pulse",
      border: "border-l-rose-500",
    };
  }

  // Caso 3: Fecha futura
  return {
    label: dueDateString,
    cardClass: "bg-emerald-50/50 border-emerald-100",
    status: "En tiempo",
    styleDueDate: "text-gray-700",
    badge:
      "bg-emerald-50 text-emerald-700 border-emerald-200/60 dark:bg-emerald-950/40 dark:text-emerald-400 dark:border-emerald-800/40",
    dot: "bg-emerald-500",
    border: "border-l-emerald-500",
  };
};

interface KanbanCardProps {
  task: any;
  columnId: string;
  index: number;
}
export const KanbanCard: React.FC<KanbanCardProps> = ({
  task,
  columnId,
  index,
}) => {
  const ref = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) {
      //   console.log(`⚠️ El ref de la tarjeta ${task.id} es nulo`);
      return;
    }
    // console.log(`✅ Registrando draggable para la tarjeta: ${task.id}`);
    return draggable({
      element: el,
      getInitialData: () => ({
        type: "card",
        taskId: task.id,
        columnId: columnId,
        index: index,
      }),
      onDragStart: () => {
        console.log(`🚀 Comenzó el arrastre de la tarjeta: ${task.id}`);
        setIsDragging(true);
      },
      onDrop: () => {
        console.log(`🏁 Terminó el arrastre de la tarjeta: ${task.id}`);
        setIsDragging(false);
      },
    });
  }, [task.id, columnId, index]);

  const dateStatus = getDueDateStatus(task.dueDate);
  return (
    <div ref={ref} className="touch-none select-none">
      <div
        className={`${dateStatus.cardClass} p-3 cursor-grab rounded-xl active:cursor-grabbing border transition-all duration-200  ${isDragging ? "opacity-40 scale-95 shadow-inner" : "hover:shadow-md"}`}
      >
        {/* Cabecera de la tarjeta */}
        <div className="flex items-center justify-between gap-2 mb-2 5">
          <span className="font-mono text-xs font-semibold tracking-wider text-slate-500 dark:text-slate-400 uppercase">
            {task.folio}
          </span>
          <div className="flex items-center gap-2">
            <span
              className={`inline-flex items-center gap-1.5 px-2 py-0.5 text-[11px] font-medium rounded-full border ${dateStatus.badge}`}
            >
              <span
                className={`w-1.5 h-1.5 rounded-full ${dateStatus.dot}`}
              ></span>
              {dateStatus.status}
            </span>
            <button
              type="button"
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1 rounded-md transition-colors cursor-pointer"
            >
              <MoreVertical size={14} />
            </button>
          </div>
        </div>
        {/* Informacion principal */}
        <div className="mb-2 space-y-0.5">
          <p className="text-sm font-semibold text-slate-900 tracking-tight">
            {task.client}
          </p>
          <p className="text-xs text-slate-600 line-clamp-2 leading-relaxed">
            {task.content}
          </p>
        </div>
        {/* footer fechas */}
        <div className="flex items-center justify-between pt-1 border-t border-slate-100 text-[11px] text-slate-400 ">
          <div className="flex items-center gap-1.5">
            <Calendar size={14} />
            <span>{task.created_at}</span>
          </div>
          <div className="flex items-center gap-1 font-medium text-slate-600">
            <TrendingUp size={14} />
            <span>{task.dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
