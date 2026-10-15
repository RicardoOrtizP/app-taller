// import { Table } from "../../../components/table/Table";

import { Button, Chip, Tooltip, type SortDescriptor } from "@heroui/react";
import CustomTable, {
  type Column,
} from "../../../components/common/CustomTable";
import React, { useCallback, useEffect, useState } from "react";
import { CustomModal } from "../../../components/common/CustomModal";
import { Pen, Trash, TriangleAlert, User, UserPen } from "lucide-react";
import { UserEditForm } from "../components/UserEditForm";
import { useUndoToast } from "../../../hooks/useUndoToast";
import { UndoToast } from "../../../components/common/UndoToast";
export interface User {
  id: number | string;
  name: string;
  email: string;
  role: string;
  status: string;
}
export const UsersPage = () => {
  const [users, setUsers] = useState<User[]>([
    {
      id: 1,
      name: "María López",
      email: "maria@ejemplo.com",
      role: "admin",
      status: "Active",
    },
    {
      id: 2,
      name: "Carlos Ramos",
      email: "carlos@ejemplo.com",
      role: "user",
      status: "Inactive",
    },
    {
      id: 3,
      name: "María López",
      email: "maria@ejemplo.com",
      role: "admin",
      status: "Active",
    },
    {
      id: 4,
      name: "Carlos Ramos",
      email: "carlos@ejemplo.com",
      role: "user",
      status: "Inactive",
    },
    {
      id: 5,
      name: "María López",
      email: "maria@ejemplo.com",
      role: "admin",
      status: "Active",
    },
    {
      id: 6,
      name: "Carlos Ramos",
      email: "carlos@ejemplo.com",
      role: "user",
      status: "Inactive",
    },
    {
      id: 7,
      name: "María López",
      email: "maria@ejemplo.com",
      role: "admin",
      status: "Active",
    },
    {
      id: 8,
      name: "Carlos Ramos",
      email: "carlos@ejemplo.com",
      role: "user",
      status: "Inactive",
    },
  ]);
  // Tipado explícito de las Columnas mediante Column<User>[]
  const columns: Column<any>[] = [
    { key: "name", label: "NOMBRE", sortable: true },
    { key: "email", label: "CORREO ELECTRÓNICO", sortable: true },
    { key: "role", label: "ROL", sortable: true },
    {
      key: "status",
      label: "ESTADO",
      align: "center",
      cellRender: (user) => (
        <Chip size="sm" color={user.status === "Active" ? "success" : "danger"}>
          {user.status === "Active" ? "Activo" : "Inactivo"}
        </Chip>
      ),
    },
    {
      key: "actions",
      label: "ACCIONES",
      align: "center",
      cellRender: (user) => (
        <div className="flex items-center justify-start gap-2">
          <button
            title="Editar usuario"
            className="p-1.5 rounded-lg text-slate-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950/30 transition-colors"
            onClick={() => setUserToUpdate(user)}
          >
            <Pen className="size-4" />
          </button>
          {user.status === "Active" && (
            <button
              title="Eliminar usuario"
              onClick={() => setUserToDelete(user)}
              className="p-1.5 rounded-lg text-slate-500 hover:text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transitions-colors"
            >
              <Trash className="size-4" />
            </button>
          )}
        </div>
      ),
    },
  ];

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [page, setPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(5);
  const [sortDescriptor, setSortDescriptor] = useState<SortDescriptor>({
    column: "name",
    direction: "ascending",
  });

  const { pendingItem, timeLeft, startUndoTimer, handleUndo } = useUndoToast();
  const pendingUser = pendingItem as User | null;

  // Estados para el modal de eliminacion
  const [userToDelete, setUserToDelete] = useState<User | null>(null);
  const [isDeleting, setIsDeleting] = useState<boolean>(false);
  // Estados para el modal de edicion de usuario
  const [userToUpdate, setUserToUpdate] = useState<User | null>(null);

  // funcion para llamar a tu backend
  const fetchUsers = useCallback(async () => {
    setIsLoading(true);
    // Calculo de brincos (skip) para el backend
    const skip = (page - 1) * pageSize;
    const limit = pageSize;
    try {
    } catch (error) {
    } finally {
      setIsLoading(false);
    }
  }, [page, pageSize, sortDescriptor]);

  // Se ejecuta cada vez que cambia la pagina, el limite o el orden
  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const handleConfirmDelete = async () => {
    if (!userToDelete) return;
    setUserToDelete(null);
    // 1. eliminacion optimista remover inmediatamente de la ui
    setUsers((prev) => prev.filter((u) => u.id !== userToDelete.id));
    // 2. Iniciar temporizador de 5 segundos
    startUndoTimer(userToDelete, {
      duration: 5,
      onConfirm: async (deleteUser) => {
        console.log("Solicitud http para el metodo delete");
      },
      onUndo: (restoreUser) => {
        setUsers((prev) => [...prev, restoreUser as User]);
      },
    });
  };
  // Manejo del clic en "Deshacer"
  const handleCancelDelete = () => {
    handleUndo((restoredUser) => {
      // Reinsertar el usuario en la lista
      setUsers((prev) => [...prev, restoredUser as User]);
    });
  };

  const handleUpdateUser = async (updatedData: Partial<User>) => {
    if (!userToUpdate) return;
    setUserToUpdate(null);
  };

  return (
    <div className="p-2 space-y-4">
      <h1 className="text-2xl font-bold">Gestión de usuarios</h1>
      <CustomTable
        columns={columns}
        items={users}
        totalCount={users.length}
        page={page}
        pageSize={pageSize}
        isLoading={isLoading}
        sortDescriptor={sortDescriptor}
        onPageChange={(newPage) => setPage(newPage)}
        onSortChange={(newSort) => {
          setSortDescriptor(newSort);
          setPage(1); // Reset a la pagina 1 al cambiar el orden
        }}
      />

      <CustomModal
        isOpen={Boolean(userToUpdate)}
        onClose={() => {
          setUserToUpdate(null);
        }}
        icon={<UserPen />}
        size="md"
        isDimissable={true}
        title="Editar datos de usuario"
        classIcon="success"
      >
        <UserEditForm
          user={userToUpdate as User}
          onSave={handleUpdateUser}
          onCancel={() => setUserToUpdate(null)}
        />
      </CustomModal>
      <CustomModal
        isDimissable={false}
        isOpen={Boolean(userToDelete)}
        onClose={() => setUserToDelete(null)}
        title="Confirmar eliminación"
        description="Esta acción es irreversible y removerá permanentementa al usuario."
        icon={<TriangleAlert />}
        size="sm"
        footer={
          <>
            <Button variant="secondary" onClick={() => setUserToDelete(null)}>
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
          <strong>{userToDelete?.name}</strong>?
        </p>
      </CustomModal>

      {Boolean(pendingUser) && (
        <UndoToast
          message={`Usuario "${pendingUser?.name}" eliminado`}
          timeLeft={timeLeft}
          onUndo={handleCancelDelete}
        />
      )}
    </div>
  );
};
