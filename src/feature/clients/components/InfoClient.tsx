import {
  Building,
  CheckCircle2,
  FileText,
  MapPin,
  Phone,
  Receipt,
  XCircle,
} from "lucide-react";
import type { Client } from "../types/ClientTypes";
import { CopyButton } from "../../../components/common/CopyButton";

interface InfoClientProps {
  client: Client | null;
}
export const InfoClient: React.FC<InfoClientProps> = ({ client }) => {
  if (!client) return;
  return (
    <div className="flex flex-col">
      <div className="min-w-0">
        <p className="text-xs text-slate-400 dark:text-slate-500 font-mono truncate">
          ID: {client.id}
        </p>
        <h3 className="text-base font-bold text-slate-900 font-mono truncate">
          {client.name}
        </h3>
      </div>
      {/* Datos de contacto */}
      <div className="space-y-2.5">
        <span className="text-[11px] font-bold uppercase tracking-wide text-slate-400 dark:text-slate-500">
          Contacto
        </span>
        <div className="grid grid-cols-1 gap-2 text-slate-600 dark:text-slate-300">
          <div className="flex items-center gap-2.5 min-w-0">
            <Phone className="size-4 text-slate-400 shrink-0" />
            <a
              href={`tel:${client.phone}`}
              className="hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {client.phone}
            </a>
          </div>
        </div>
      </div>
      {/* Datos fiscales */}
      <div className="pt-3 border-t border-slate-100 dark:border-slate-800/80 space-y-2.5">
        <div className="flex items-center justify-between">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
            <Receipt className="size-3.5 text-slate-500" />
            Datos Fiscales
          </span>
          {client.rfc ? (
            <span className="text-[11px] font-medium text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="size-3" />
              Registrados
            </span>
          ) : (
            <span className="text-[11px] font-medium text-slate-400 flex items-center gap-1">
              <XCircle className="size-3" />
              No aplica
            </span>
          )}
        </div>
        {client.rfc ? (
          <div className="p-3.5 rounded-xl bg-slate-50 dark:bg-slate-800/40 border border-slate-100 dark:border-slate-800 space-y-2">
            {/* Razon Social */}
            <div className="flex items-start gap-2">
              <Building className="size-4 text-slate-400 shrink-0 mt-0.5" />
              <div className="min-w-0 grid cols-2">
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    Razón Social
                  </p>
                  <p className="font-semibold text-slate-800 dark:text-slate-200 text-xs">
                    {client.nombre_fiscal}
                  </p>
                </div>
              </div>
              {client.nombre_fiscal && (
                <CopyButton
                  textToCopy={client.nombre_fiscal}
                  label="Copiar Razón Social"
                />
              )}
            </div>
            {/* RFC y CP */}
            <div className="grid grid-cols-2 gap-2 pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
              <div className="flex items-start gap-2">
                <FileText className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    RFC
                  </p>
                  <p className="font-mono font-bold text-indigo-600 dark:text-indigo-400 text-xs">
                    {client.rfc}
                  </p>
                </div>
                {client.rfc && (
                  <CopyButton textToCopy={client.rfc} label="Copiar RFC" />
                )}
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="size-3.5 text-slate-400 shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    C.P
                  </p>
                  <p className="font-mono text-slate-700 dark:text-slate-300 text-xs">
                    {client.codigo_postal}
                  </p>
                </div>
                {client.codigo_postal && (
                  <CopyButton
                    textToCopy={client.codigo_postal}
                    label="Copiar Código Postal"
                  />
                )}
              </div>
            </div>
            {/* Regimen fiscal */}
            {client.regimen_fiscal && (
              <div>
                <div className="pt-1 border-t border-slate-200/50 dark:border-slate-700/50">
                  <p className="text-[10px] text-slate-400 font-semibold uppercase">
                    Régimen Fiscal
                  </p>
                  <p
                    className="text-[11px] leading-snug text-slate-600 dark:text-slate-300 truncate"
                    title={client.regimen_fiscal}
                  >
                    {client.regimen_fiscal}
                    {client.regimen_fiscal && (
                      <CopyButton
                        textToCopy={client.regimen_fiscal}
                        label="Copiar Regimen Fiscal"
                      />
                    )}
                  </p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <p className="text-xs text-slate-400 dark:text-slate-500 italic">
            Este cliente no tiene información de facturación registrada.
          </p>
        )}
      </div>
    </div>
  );
};
