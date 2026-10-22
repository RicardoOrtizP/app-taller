import { dropTargetForElements } from "@atlaskit/pragmatic-drag-and-drop/element/adapter";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { KanbanCard } from "./KanbanCard";
interface KanbanColumnProps {
  column: any;
}
export const KanbanColumn: React.FC<KanbanColumnProps> = ({ column }) => {
  const ref = useRef(null);
  const [isDraggedOver, setIsDraggedOver] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    return dropTargetForElements({
      element: el,
      getData: () => ({ columnId: column.id }),
      onDragEnter: () => setIsDraggedOver(true),
      onDragLeave: () => setIsDraggedOver(false),
      onDrop: () => setIsDraggedOver(false),
    });
  }, [column.id]);

  return (
    <div
      ref={ref}
      className={`w-65 flex-shrink-0 bg-default-100/70 dark:bg-default-50/10 rounded-xl p-2 flex flex-col gap-2 transition-colors border-2 ${isDraggedOver ? "border-primary-500 bg-primary-50/20 dark:bg-primary-950/20" : "border-transparent"}`}
    >
      {/* Encabezado de columna */}
      <div className="flex items-center justify-between px-1">
        <div className="flex items-center gap-2">
          <span
            className={`w-2.5 h-2.5 rounded-full ${column.accentColor || "bg-primary"}`}
          />
          <h3 className="font-semibold text-sm text-foreground tracking-wide">
            {column.title}
          </h3>
        </div>
        <span className="text-xs font-semibold text-default-500 bg-default-200/60 dark:bg-default-200 px-2 py-0.5 rounded-full">
          {column.items.length}
        </span>
      </div>
      {/* Lista de tarjetas */}
      <div className="flex flex-col gap-2 5 h-[calc(100vh-200px)] overflow-y-auto max-h-[calc(100vh-200px)] pr-0.5">
        {column.items.map((task, index: number) => (
          <KanbanCard
            key={task.id}
            task={task}
            columnId={column.id}
            index={index}
          />
        ))}
        {column.items.length === 0 && (
          <div className="flex items-center justify-center h-20 border-2 border-dashed border-default-200 rounded-xl text-default-400 text-xs font-medium">
            Arrastra una tarjeta aquí
          </div>
        )}
      </div>
    </div>
  );
};
