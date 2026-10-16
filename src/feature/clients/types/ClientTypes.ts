export interface ClientFormData {
  name: string;
  phone: string;
  email?: string;
  hasTaxData: boolean;
  rfc?: string;
  nombre_fiscal?: string;
}
export interface Client {
  id: string;
  name: string;
  phone: string;
  email?: string | undefined | null;
  hasTaxData?: boolean;
  rfc?: string | undefined | null;
  nombre_fiscal?: string | undefined | null;
  codigo_postal?: string | undefined | null;
  is_active: boolean;
  regimen_fiscal?: string | undefined | null;
}
