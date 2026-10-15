import type React from "react";
import type { User } from "../pages/UsersPage";
import { useEffect, useState } from "react";
import {
  FieldError,
  Input,
  Label,
  Surface,
  TextField,
  Select,
  ListBox,
  Button,
} from "@heroui/react";

interface UserEditFormProps {
  user: User;
  onSave: (updateData: Partial<User>) => Promise<void>;
  onCancel: () => void;
}

export const UserEditForm: React.FC<UserEditFormProps> = ({
  user,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    role: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  // Inicializar el formulario cuando cambie el usuario seleccionado
  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name || "",
        email: user.email || "",
        role: user.role || "",
      });
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await onSave(formData);
    } catch (error) {
      console.error("Error al actualizar usuario", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Surface variant="default" className="space-y-4">
        <TextField isRequired name="name" type="text">
          <Label>Nombre Completo</Label>
          <Input
            placeholder="Nombre Completo"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          />
          <FieldError />
        </TextField>

        <TextField isRequired name="email" type="email">
          <Label>Correo electrónico</Label>
          <Input
            placeholder="usuario@mail.com"
            value={formData.email}
            onChange={(e) =>
              setFormData({ ...formData, email: e.target.value })
            }
          />
          <FieldError />
        </TextField>

        <Select
          isRequired
          className="w-full"
          name="role"
          placeholder="Seleccionar rol"
          value={formData.role}
        >
          <Label>Rol</Label>
          <Select.Trigger>
            <Select.Value />
            <Select.Indicator />
          </Select.Trigger>
          <Select.Popover>
            <ListBox>
              <ListBox.Item id="admin" textValue="admin">
                Administrador
                <ListBox.ItemIndicator />
              </ListBox.Item>
              <ListBox.Item id="user" textValue="user">
                Usuario
                <ListBox.ItemIndicator />
              </ListBox.Item>
            </ListBox>
          </Select.Popover>
        </Select>
      </Surface>
      {/* botones de accion integrados al submit del formulario */}
      <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Button
          type="button"
          variant="secondary"
          onClick={onCancel}
          isDisabled={isSubmitting}
        >
          Cancelar
        </Button>
        <Button type="submit" variant="primary" isPending={isSubmitting}>
          Guardar Cambios
        </Button>
      </div>
    </form>
  );
};
