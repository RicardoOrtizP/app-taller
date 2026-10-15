export interface ApiErrorResponse {
  message: string;
  errors?: Record<string, string>; // Errores por campo (ej. { email: 'Email ya registrado})
}
export interface AuthResponse {
  token: string;
  user: {
    id: string;
    email: string;
    role: string;
  };
}
