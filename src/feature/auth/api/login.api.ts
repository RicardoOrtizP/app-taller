import { apiClient } from "../../../lib/axios";
import type { LoginFormData } from "../schemas/login.schema";
import type { AuthResponse } from "../types/auth.types";

// FUncion pura de consumo de API que ejecutará TanStack Query
export const loginApi = async (
  credentials: LoginFormData,
): Promise<AuthResponse> => {
  const { data } = await apiClient.post<AuthResponse>(
    "/auth/login",
    credentials,
  );
  return data;
};
