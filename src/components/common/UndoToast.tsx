import { Button, Surface } from "@heroui/react";
import { Trash2, Undo2 } from "lucide-react";
import type React from "react";

export interface PendingUndoItem<T> {
  item: T;
  index: number;
}
interface UndoToastProps {
  message: string;
  timeLeft: number;
  onUndo: () => void;
}

export const UndoToast: React.FC<UndoToastProps> = ({
  message,
  timeLeft,
  onUndo,
}) => {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 animate-fade-in pointer-events-auto">
      <Surface
        variant="default"
        className="flex items-center gap-4 px-4 py-3 bg-slate-900/95 dark:bg-slate-100/95 backdrop-blur-md text-white dark:text-slate-900 shadow-2xl rounded-2xl border border-slate-800 dark:border-slate-200"
      >
        {/* Contenido e Icono */}
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center size-8 rounded-xl bg-rose-500/20 text-rose-400 dark:text-rose-600 shrink-0">
            <Trash2 className="size-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold leading-tight">
              {message}
            </span>
            <span className="text-xs text-slate-400 dark:text-slate-500">
              Deshacer antes de que expire el tiempo
            </span>
          </div>
        </div>

        {/* Separador e interacción de Deshacer */}
        <div className="flex items-center gap-3 pl-3 border-l border-slate-800 dark:border-slate-300">
          {/* Badge con la cuenta regresiva */}
          <span className="flex items-center justify-center size-7 rounded-full bg-slate-800 dark:bg-slate-200 text-xs font-bold text-indigo-400 dark:text-indigo-600 shrink-0">
            {timeLeft}s
          </span>

          <Button
            size="sm"
            variant="danger"
            onClick={onUndo}
            className="flex items-center gap-1.5 text-xs font-semibold"
          >
            <Undo2 className="size-3.5" />
            Deshacer
          </Button>
        </div>
      </Surface>
    </div>
  );
};
