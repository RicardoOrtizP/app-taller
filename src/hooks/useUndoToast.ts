import { useCallback, useRef, useState } from "react";

interface UndoOptions<T> {
  duration?: number; // Tiempo en segundos (default: 5)
  onConfirm: (item: T) => Promise<void>; // Accion real al expirar el tiempo
  onUndo?: (item: T) => void; // Callback al cancelar
}

export function useUndoToast<T>() {
  const [pendingItem, setPendingItem] = useState<T | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(0);

  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const intervalRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const startUndoTimer = useCallback((item: T, options: UndoOptions<T>) => {
    const duration = options.duration || 5;
    //Limpiar temporizadores previos si existen
    if (timerRef.current) clearTimeout(timerRef.current);
    if (intervalRef.current) clearInterval(intervalRef.current);

    setPendingItem(item);
    setTimeLeft(duration);

    // Intervalo para actualizar el contador cada segundo
    intervalRef.current = setInterval(() => {
      setTimeLeft((prev) => Math.max(0, prev - 1));
    }, 1000);

    // Temporizador para confirmar la eliminación definitiva tas N segundos
    timerRef.current = setTimeout(async () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      setPendingItem(null);

      try {
        await options.onConfirm(item);
      } catch (error) {
        console.error("Error al confirmar eliminacion diferida", error);
        options.onUndo?.(item); // revertir en caso de falla de red
      }
    }, duration * 1000);
  }, []);

  const handleUndo = useCallback(
    (onUndoCallback?: (item: T) => void) => {
      if (timerRef.current) clearTimeout(timerRef.current);
      if (intervalRef.current) clearInterval(intervalRef.current);

      if (pendingItem) {
        onUndoCallback?.(pendingItem);
      }
      setPendingItem(null);
      setTimeLeft(0);
    },
    [pendingItem],
  );

  return {
    pendingItem,
    timeLeft,
    startUndoTimer,
    handleUndo,
  };
}
