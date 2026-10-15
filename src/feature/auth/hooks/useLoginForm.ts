import { useForm } from "react-hook-form";
import { loginSchema, type LoginFormData } from "../schemas/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { type ApiErrorResponse, type AuthResponse } from "../types/auth.types";
import { loginApi } from "../api/login.api";
import { isAxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";

interface UseLoginFormOptions {
  onSuccess?: (data: AuthResponse) => void;
}
export const useLoginForm = (options?: UseLoginFormOptions) => {
  // 1. Inicializamos react form hook
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
    mode: "onTouched",
  });
  // 2. Integramos la mutacion de TankStack Query
  const loginMutation = useMutation({
    mutationFn: loginApi,
    onSuccess: (data) => {
      // Notificamos éxito si la mutación fue exitosa
      options?.onSuccess?.(data);
    },
    onError: (error) => {
      // 3. Manejo dinamico de errores devueltos por el servidor Axios
      if (isAxiosError<ApiErrorResponse>(error) && error.response) {
        const serverData = error.response.data;
        // Caso A: El servidor devuelve errores de validacion especificos por campo
        if (serverData.errors) {
          Object.entries(serverData.errors).forEach(([field, message]) => {
            form.setError(field as keyof LoginFormData, {
              type: "server",
              message,
            });
          });
        }
        // Caso B: El servidor devuelve un mensaje de error general (ej: 401 Unauthorized)
        if (serverData.message) {
          form.setError("root", {
            type: "server",
            message: serverData.message,
          });
        }
      } else {
        // Caso C: Error de red o error no controlado en el cliente
        form.setError("root", {
          type: "network",
          message: "Ocurrió un error inesperado al conectar con el servidor.",
        });
      }
    },
  });

  //4 Manejador de envío que conecta la validacion local con la mutación
  const onSubmit = form.handleSubmit((data) => {
    loginMutation.mutate(data);
  });

  return {
    ...form,
    onSubmit,
    // Exponemos el estado de carga proveniente de Tankstack Query
    isSubmitting: loginMutation.isPending,
  };
};
