import { useCallback, useEffect, useState } from "react";
import { CustomModal } from "../../../components/common/CustomModal";
import { Eye, Notebook, Pen, Trash, TriangleAlert } from "lucide-react";
import { ClientEditForm } from "../components/ClientEditForm";
import type { Client } from "../types/ClientTypes";
import CustomTable, {
  type Column,
} from "../../../components/common/CustomTable";
import { Button, Chip, type SortDescriptor } from "@heroui/react";
import { InfoClient } from "../components/InfoClient";
import { useUndoToast } from "../../../hooks/useUndoToast";
import { UndoToast } from "../../../components/common/UndoToast";
const fakeData: Client[] = [
  {
    id: "e3b9c4d1-8f2a-4c91-b3e5-7a6d8c9e0f1a",
    name: "Sofía Mendoza",
    phone: "5543210987",
    email: "sofia.mendoza@example.com",
    is_active: true,
    hasTaxData: true,
    nombre_fiscal: "SOFÍA MENDOZA",
    rfc: "MEDS920415HG7",
    codigo_postal: "06700",
    regimen_fiscal:
      "612 - Personas Físicas con Actividades Empresariales y Profesionales",
  },
  {
    id: "7d6f5e4d-3c2b-1a0f-9e8d-7c6b5a4f3e2d",
    name: "Industrias del Norte S.A. de C.V.",
    phone: "8112345678",
    email: "contacto@indnorte.mx",
    is_active: true,
    hasTaxData: true,
    nombre_fiscal: "INDUSTRIAS DEL NORTE SA DE CV",
    rfc: "INO150822TX3",
    codigo_postal: "64000",
    regimen_fiscal: "601 - General de Ley Personas Morales",
  },
  {
    id: "1a2b3c4d-5e6f-7a8b-9c0d-1e2f3a4b5c6d",
    name: "Alejandro Ruiz",
    phone: "3318765432",
    email: "alex.ruiz@example.com",
    is_active: false,
    hasTaxData: false,
    nombre_fiscal: null,
    rfc: null,
    codigo_postal: null,
    regimen_fiscal: null,
  },
  {
    id: "f4g5h6i7-8j9k-0l1m-2n3o-4p5q6r7s8t9u",
    name: "Logística y Distribución del Centro",
    phone: "4429876543",
    email: null,
    is_active: true,
    hasTaxData: true,
    nombre_fiscal: "LOGISTICA Y DISTRIBUCION DEL CENTRO SA DE CV",
    rfc: "LDC180310PL8",
    codigo_postal: "76000",
    regimen_fiscal: "601 - General de Ley Personas Morales",
  },
  {
    id: "9a8b7c6d-5e4f-3g2h-1i0j-k9l8m7n6o5p",
    name: "Carlos Eduardo Villa",
    phone: "2223456789",
    email: "carlos.villa@outlook.com",
    is_active: true,
    hasTaxData: true,
    nombre_fiscal: "CARLOS EDUARDO VILLA",
    rfc: "VICC881123KM5",
    codigo_postal: "72000",
    regimen_fiscal: "626 - Régimen Simplificado de Confianza (RESICO)",
  },
  {
    id: "b2c3d4e5-f6a7-8b9c-0d1e-2f3a4b5c6d7e",
    name: "Mariana Gómez Fuentes",
    phone: "9998765432",
    email: "mariana.gomez@gmail.com",
    is_active: true,
    hasTaxData: false,
    nombre_fiscal: null,
    rfc: null,
    codigo_postal: null,
    regimen_fiscal: null,
  },
  {
    id: "c4d5e6f7-a8b9-c0d1-e2f3-a4b5c6d7e8f9",
    name: "Comercializadora de Occidente",
    phone: "3331234567",
    email: "administracion@comoccidente.com",
    is_active: false,
    hasTaxData: true,
    nombre_fiscal: "COMERCIALIZADORA DE OCCIDENTE S DE RL",
    rfc: "COC120401TR9",
    codigo_postal: "44100",
    regimen_fiscal: "601 - General de Ley Personas Morales",
  },
  {
    id: "d5e6f7a8-b9c0-d1e2-f3a4-b5c6d7e8f9a0",
    name: "Ricardo Anaya Pozos",
    phone: "5511223344",
    email: "ricardo.anaya@yahoo.com",
    is_active: true,
    hasTaxData: true,
    nombre_fiscal: "RICARDO ANAYA POZOS",
    rfc: "AAPR950105LJ2",
    codigo_postal: "01000",
    regimen_fiscal: "605 - Sueldos y Salarios e Ingresos Asimilados a Salarios",
  },
  {
    id: "e6f7a8b9-c0d1-e2f3-a4b5-c6d7e8f9a0b1",
    name: "Patricia Luna Torres",
    phone: "8187654321",
    email: null,
    is_active: false,
    hasTaxData: false,
    nombre_fiscal: null,
    rfc: null,
    codigo_postal: null,
    regimen_fiscal: null,
  },
  {
    id: "f7a8b9c0-d1e2-f3a4-b5c6-d7e8f9a0b1c2",
    name: "Desarrollos Tecnológicos Alfa",
    phone: "4435678901",
    email: "soporte@alfa-tech.mx",
    is_active: true,
    hasTaxData: true,
    nombre_fiscal: "DESARROLLOS TECNOLOGICOS ALFA SA DE CV",
    rfc: "DTA2106159A1",
    codigo_postal: "58000",
    regimen_fiscal: "601 - General de Ley Personas Morales",
  },
];

export const ClientsPage = () => {
  const columns: Column<any>[] = [
    { key: "name", label: "Nombre", width: 250, sortable: true },
    { key: "phone", label: "Telefono", width: 150 },
    {
      key: "is_active",
      label: "Estatus",
      align: "center",
      width: 30,
      cellRender: (client) => (
        <Chip
          size="sm"
          variant={client.is_active ? "soft" : "soft"}
          color={client.is_active ? "success" : "danger"}
        >
          {client.is_active ? "Activo" : "Inactivo"}
        </Chip>
      ),
    },
    { key: "last_work", label: "Último trabajo" },
    {
      key: "actions",
      label: "Acciones",
      align: "center",
      width: 120,
      cellRender: (client) => (
        <div className="flex items-center justify-start gap-2">
          <button
            onClick={() => setClientToSee(client)}
            title="Ver cliente"
            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
          >
            <Eye className="size-4" />
          </button>
          <button
            title="Editar cliente"
            onClick={() => setClientToUpdate(client)}
            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
          >
            <Pen className="size-4" />
          </button>
          {client.is_active && (
            <button
              title="Eliminar cliente"
              onClick={() => setClientToDelete(client)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors"
            >
              <Trash className="size-4" />
            </button>
          )}
        </div>
      ),
    },
  ];
  const [clients, setClients] = useState<Client[]>(fakeData);
  // Estado de la tabla
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const [clientToSee, setClientToSee] = useState<Client | null>(null);
  const [clientToDelete, setClientToDelete] = useState<Client | null>(null);
  const [clientToUpdate, setClientToUpdate] = useState<Client | null>(null);
  const { pendingItem, timeLeft, startUndoTimer, handleUndo } = useUndoToast();
  const pendingClient = pendingItem as Client | null;

  const fetchClients = useCallback(async () => {
    setIsLoading(true);
    // Calculo de brincos
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, sortDescriptor]);

  useEffect(() => {
    fetchClients();
  }, [fetchClients]);

  const handleUpdateClient = async (updatedData: Partial<Client>) => {
    if (!clientToUpdate) return;
    setClientToUpdate(null);
    console.log(updatedData);
  };

  const handleConfirmDelete = () => {
    if (!clientToDelete) return;

    setClientToDelete(null);

    // 1. eliminacion optimista remover inmediatamente de la ui
    setClients((prev) => prev.filter((c) => c.id !== clientToDelete.id));
    // 2. Iniciar temporizador de 5 segundos
    startUndoTimer(clientToDelete, {
      duration: 5,
      onConfirm: async (deleteClient) => {
        console.log("Solicitud http para el metodo delete", deleteClient);
      },
      onUndo: (restoreClient) => {
        setClients((prev) => [...prev, restoreClient as Client]);
      },
    });
  };

  const handleCancelDelete = () => {
    handleUndo((restoreClient) => {
      setClients((prev) => [...prev, restoreClient as Client]);
    });
  };

  return (
    <div className="p-2 space-y-4">
      <h1 className="text-2xl font-bold">Directorio permanente de Clientes</h1>
      <CustomTable
        columns={columns}
        items={clients}
        totalCount={clients.length}
        page={page}
        pageSize={pageSize}
        isLoading={isLoading}
        sortDescriptor={sortDescriptor}
        onPageChange={(newPage) => setPage(newPage)}
        onSortChange={(newSort) => {
          setSortDescriptor(newSort);
          setPage(1);
        }}
      />
      {/* Modal para editar datos del cliente */}
      <CustomModal
        isOpen={Boolean(clientToUpdate)}
        onClose={() => {
          setClientToUpdate(null);
        }}
        icon={<Notebook />}
        size="md"
        isDimissable={false}
        title="Editar datos de cliente"
        classIcon="success"
      >
        <ClientEditForm
          client={clientToUpdate as Client}
          onSave={handleUpdateClient}
          onCancel={() => {
            setClientToUpdate(null);
          }}
        />
      </CustomModal>
      {/* Modal pare ver todos los datos del cliente */}
      <CustomModal
        isOpen={Boolean(clientToSee)}
        onClose={() => {
          setClientToSee(null);
        }}
        icon={<Notebook />}
        size="md"
        isDimissable={true}
        title="Datos de cliente"
        classIcon="info"
        disableAnimation={true}
      >
        <InfoClient client={clientToSee} />
      </CustomModal>
      <CustomModal
        isOpen={Boolean(clientToDelete)}
        onClose={() => setClientToDelete(null)}
        title="Confirmar eliminación"
        description="Esta acción es irreversible y removerá permanentemente al cliente"
        icon={<TriangleAlert />}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setClientToDelete(null)}>
              Cancelar
            </Button>
            <Button variant="danger" onClick={handleConfirmDelete}>
              Sí, eliminar
            </Button>
          </>
        }
        classIcon="danger"
      >
        <p className="text-slate-600 dark:text-slate-300 text-base">
          ¿Estás seguro de que deseas eliminar a{" "}
          <strong>{clientToDelete?.name}</strong>?
        </p>
      </CustomModal>
      {Boolean(pendingClient) && (
        <UndoToast
          message={`Cliente "${pendingClient?.name}" eliminado`}
          timeLeft={timeLeft}
          onUndo={handleCancelDelete}
        />
      )}
    </div>
  );
};
