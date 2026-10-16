import { Button, Tooltip, Toast, toast } from "@heroui/react";
import { Check, Copy, PersonStanding } from "lucide-react";
import { useState } from "react";

interface CopyButtonProps {
  textToCopy: string;
  label?: string;
}
export const CopyButton: React.FC<CopyButtonProps> = ({
  textToCopy,
  label = "Copiar",
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async (e: React.MouseEvent) => {
    e.stopPropagation(); // Evita disparar otros eventos de la tarjeta
    if (!textToCopy) return;

    const id = toast("You have been invited to join a team", {
      actionProps: {
        children: "Dismiss",
        onPress: () => toast.close(id),
        variant: "tertiary",
      },
      description: "Bob sent you an invitation to join HeroUI team",
      indicator: <PersonStanding />,
      variant: "default",
    });
    try {
      await navigator.clipboard.writeText(textToCopy);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Resetea el icono tras 2 segundos
    } catch (error) {
      console.error("Error al copiar al portapapeles:", error);
    }
  };

  return (
    <Button
      isIconOnly
      size="sm"
      variant="tertiary"
      onClick={handleCopy}
      className={`${copied ? "bg-green-200 dark:bg-green-400" : ""} mt-1.5 ml-1.5 size-6 min-w-6 p-0 text-slate-400 hover:text-slate-600 dark:hover:text-indigo-400 transition-colors`}
      aria-label={label}
    >
      {copied ? (
        <Check className="size-3 text-green-500 font-bold" />
      ) : (
        <Copy className="size-3" />
      )}
    </Button>
  );
};
