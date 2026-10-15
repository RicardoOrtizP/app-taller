import { Button, Input, Modal, Surface, TextField } from "@heroui/react";
import { Form, Rocket } from "lucide-react";
import type React from "react";

export type ModalSize = "sm" | "md" | "lg" | "xl" | "2xl" | "full";
export interface CustomModalProps {
  isOpen: boolean; // estado de visibilidad (modo controlado)
  onClose: () => void; // funcion callback al cerrar el modal
  title?: string; // titulo principal
  description?: string; // descripcion o subtitulo
  icon?: React.ReactNode; // Icono a mostrar
  children: React.ReactNode; // contenido principal (formularios, divs etc)
  footer?: React.ReactNode; // Botones de accion o footer personalizado
  size?: ModalSize; // Tamaño del contenedor modal
  placement?: "auto" | "center" | "top"; // Posicionamiento del modal
  isDimissable?: boolean; // Si se puede cerrar haciendo click afuera o con la tecla esc
  classIcon?: string;
}

export const CustomModal: React.FC<CustomModalProps> = ({
  isOpen,
  onClose,
  title,
  description,
  icon,
  children,
  footer,
  size = "md",
  placement = "center",
  isDimissable = true,
  classIcon = "bg-indigo-50 text-indigo-600 dark:bg-indigo-950/60 dark:text-indigo-400",
}) => {
  // Mapeo de tamaño a clases max-width
  const sizeClasses: Record<ModalSize, string> = {
    sm: "sm:max-w-sm",
    md: "sm:max-w-md",
    lg: "sm:max-w-lg",
    xl: "sm:max-w-xl",
    "2xl": "sm:max-w-2xl",
    full: "sm:max-w-full m-4",
  };
  const iconColors: Record<string, string> = {
    danger: "bg-rose-100 text-rose-500/80",
    warning: "bg-yellow-100 text-yellow-600",
    error: "bg-red-100 text-red-600",
    info: "bg-cyan-100 text-cyan-600",
    success: "bg-green-100 text-green-600",
  };

  return (
    <Modal isOpen={isOpen} onOpenChange={(open) => !open && onClose()}>
      <Modal.Backdrop isDismissable={isDimissable}>
        <Modal.Container placement={placement}>
          <Modal.Dialog className={`${sizeClasses[size]} w-full`}>
            <Modal.CloseTrigger onClick={onClose} />
            {/* Encabezado renderizado condicional */}
            {(title || description || icon) && (
              <Modal.Header className="p-1 pb-1">
                <div className="flex items-center gap-3 pr-8">
                  {icon && (
                    <Modal.Icon className={iconColors[classIcon]}>
                      {icon}
                    </Modal.Icon>
                  )}
                  {title && (
                    <Modal.Heading className="text-lg font-semibold leading-none text-slate-900 dark:text-white">
                      {title}
                    </Modal.Heading>
                  )}
                </div>
                {description && (
                  <p className="mt-1.5 text-sm leading-5 text-slate-500 dark:text-slate-400">
                    {description}
                  </p>
                )}
              </Modal.Header>
            )}
            <Modal.Body className="p-1">{children}</Modal.Body>
            {/* Pie de pagina / botones de accion */}
            {footer && (
              <div className="flex items-center justify-end gap-3 px-6 py-4 border-t border-slate-100 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 rounded-b-2xl">
                {footer}
              </div>
            )}
          </Modal.Dialog>
        </Modal.Container>
      </Modal.Backdrop>
    </Modal>
  );
};
