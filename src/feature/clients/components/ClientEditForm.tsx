import {
  Checkbox,
  FieldError,
  Input,
  Label,
  Separator,
  Surface,
  TextField,
  Select,
  ListBox,
  Button,
} from "@heroui/react";
import type React from "react";
import { useState } from "react";
import type { Client, ClientFormData } from "../types/ClientTypes";

interface ClientEditFormProps {
  client: Client;
  onSave: (data: Partial<Client>) => Promise<void>;
  onCancel: () => void;
}
export const ClientEditForm: React.FC<ClientEditFormProps> = ({
  client,
  onSave,
  onCancel,
}) => {
  const [formData, setFormData] = useState({
    name: client?.name || "",
    phone: client?.phone || "",
    email: client?.email || "",
    hasTaxData: client?.hasTaxData,
    rfc: client?.rfc,
    nombre_fiscal: client?.nombre_fiscal,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <Surface variant="default" className="space-y-4">
        <TextField isRequired name="name" type="text">
          <Label>Nombre completo</Label>
          <Input placeholder="Nombre completo" />
          <FieldError />
        </TextField>
        <TextField name="phone" type="tel" isRequired>
          <Label>Phone</Label>
          <Input
            type="tel"
            minLength={8}
            maxLength={10}
            placeholder="+1 (555) 000-0000"
            pattern="^[0-9]{8,10}$"
          />
          <FieldError />
        </TextField>
        <TextField name="email" type="email">
          <Label>Correo electrónico</Label>
          <Input placeholder="nombre@mail.com" />
          <FieldError />
        </TextField>
      </Surface>
      <Separator orientation="horizontal" />
      {/* Checkbox para requerir datos fiscales */}
      <div className="flex items-center gap-2 px-1">
        <Checkbox
          id="hasTaxData"
          isSelected={formData.hasTaxData}
          onChange={(isSelected: boolean) => {
            setFormData((prev) => ({ ...prev, hasTaxData: isSelected }));
          }}
        >
          <Checkbox.Content>
            <Checkbox.Control className="bg-success-soft before:bg-success">
              <Checkbox.Indicator />
            </Checkbox.Control>
            Datos fiscales
          </Checkbox.Content>
        </Checkbox>
      </div>
      {/* Sección 2 Datos fiscales (condicionales) */}
      {formData.hasTaxData && (
        <Surface
          variant="default"
          className="space-y-4 p-4 rounded-2xl border border-indigo-100 dark:border-indigo-950/50 bg-indigo-50/30 dark:bg-indigo-950/10 animate-fade-in"
        >
          <div className="flex item-center gap-2 text-sm font-semibold">
            <span>Datos de Facturación</span>
          </div>
          <TextField isRequired name="rfc" type="text">
            <Label>RFC</Label>
            <Input placeholder="RFC" />
            <FieldError />
          </TextField>
          <TextField isRequired name="nombre_fiscal" type="text">
            <Label>Nombre Fiscal</Label>
            <Input placeholder="Nombre Fiscal" />
            <FieldError />
          </TextField>
          <TextField isRequired name="codigo_postal" type="text">
            <Label>Código Postal</Label>
            <Input placeholder="Código Postal" />
            <FieldError />
          </TextField>
          <Select
            isRequired
            className="w-full"
            name="regimen_fiscal"
            placeholder="Regimen fiscal"
          >
            <Label>Regimen Fiscal</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item>
                  Regimen 1
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
          <Select
            isRequired
            className="w-full"
            name="regimen_fiscal"
            placeholder="Regimen fiscal"
          >
            <Label>Uso de CFDI</Label>
            <Select.Trigger>
              <Select.Value />
              <Select.Indicator />
            </Select.Trigger>
            <Select.Popover>
              <ListBox>
                <ListBox.Item>
                  Regimen 1
                  <ListBox.ItemIndicator />
                </ListBox.Item>
              </ListBox>
            </Select.Popover>
          </Select>
        </Surface>
      )}
      {/* // botones de accion integrados al formulario */}
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
