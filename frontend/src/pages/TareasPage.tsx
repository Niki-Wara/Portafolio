import { useState } from "react";
import { Plus } from "lucide-react";

import Button from "../components/ui/Button";
import Modal from "../components/ui/Modal";

import TareasTable from "../components/tables/TareasTable";
import TareaForm from "../components/forms/TareaForm";
import EditarTareaForm from "../components/forms/EditarTareaForm";

import { useTareas } from "../hooks/useTareas";

import type {
  Tarea,
  CrearTareaDTO,
  ActualizarTareaDTO,
  Estado,
} from "../interfaces/Tareas";

export default function TareasPage() {
  const {
    tareas,
    loading,
    crear,
    actualizarEstado,
    eliminar,
  } = useTareas();

  const [openCrear, setOpenCrear] =
    useState(false);

  const [seleccionada, setSeleccionada] =
    useState<Tarea | null>(null);

  const [formError, setFormError] =
    useState<string | null>(null);

  // Crear tarea
  const handleCrear = async (
    data: CrearTareaDTO
  ) => {
    try {
      setFormError(null);
      await crear(data);
      setOpenCrear(false);
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  // Editar tarea
  const handleEditar = async (
    data: ActualizarTareaDTO
  ) => {
    if (!seleccionada) return;

    try {
      setFormError(null);

      // Si cambia estado
      if (data.estado) {
        await actualizarEstado(
          seleccionada.id,
          data.estado as Estado
        );
      }

      setSeleccionada(null);
    } catch (err: any) {
      setFormError(err.message);
    }
  };

  // Cambiar estado rápido
  const handleEstado = async (
    id: number,
    estado: Estado
  ) => {
    try {
      await actualizarEstado(
        id,
        estado
      );
    } catch (err: any) {
      alert(err.message);
    }
  };

  // Eliminar
  const handleEliminar = async (
    id: number
  ) => {
    if (
      !confirm(
        "¿Deseas eliminar esta tarea?"
      )
    )
      return;

    try {
      await eliminar(id);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-800">
            Tareas
          </h1>

          <p className="text-sm text-slate-500 mt-1">
            {tareas.length} tarea(s)
            registradas
          </p>
        </div>

        <Button
          onClick={() =>
            setOpenCrear(true)
          }
          icon={
            <Plus size={16} />
          }
        >
          Nueva Tarea
        </Button>
      </div>

      {/* Loading */}
      {loading ? (
        <div className="bg-white border rounded-2xl p-6 text-center text-slate-500">
          Cargando tareas...
        </div>
      ) : (
        <TareasTable
          tareas={tareas}
          onEstado={
            handleEstado
          }
          onEditar={(t) => {
            setFormError(
              null
            );
            setSeleccionada(
              t
            );
          }}
          onEliminar={
            handleEliminar
          }
        />
      )}

      {/* Crear */}
      <Modal
        open={openCrear}
        onClose={() =>
          setOpenCrear(false)
        }
        title="Nueva Tarea"
      >
        {formError && (
          <p className="text-red-600 text-sm mb-3">
            {formError}
          </p>
        )}

        <TareaForm
          onSubmit={
            handleCrear
          }
        />
      </Modal>

      {/* Editar */}
      <Modal
        open={
          !!seleccionada
        }
        onClose={() =>
          setSeleccionada(
            null
          )
        }
        title="Editar Tarea"
      >
        {formError && (
          <p className="text-red-600 text-sm mb-3">
            {formError}
          </p>
        )}

        {seleccionada && (
          <EditarTareaForm
            tarea={
              seleccionada
            }
            onSubmit={
              handleEditar
            }
            onCancel={() =>
              setSeleccionada(
                null
              )
            }
          />
        )}
      </Modal>
    </div>
  );
}