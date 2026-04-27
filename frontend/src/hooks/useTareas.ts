import { useEffect, useState } from "react";
import { tareaService } from "../services/tareaService";
import type {
  Tarea,
  CrearTareaDTO,
  ActualizarTareaDTO,
  Estado,
} from "../interfaces/Tareas";

export const useTareas = () => {
  const [tareas, setTareas] =
    useState<Tarea[]>([]);

  const [loading, setLoading] =
    useState(false);

  const [error, setError] =
    useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      const data =
        await tareaService.getAll();

      setTareas(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const crear = async (
    payload: CrearTareaDTO
  ) => {
    const nueva =
      await tareaService.create(payload);

    setTareas((prev) => [
      ...prev,
      nueva,
    ]);
  };

  const actualizar = async (
    id: number,
    payload: ActualizarTareaDTO
  ) => {
    const tarea =
      await tareaService.update(
        id,
        payload
      );

    setTareas((prev) =>
      prev.map((t) =>
        t.id === id ? tarea : t
      )
    );
  };

  const actualizarEstado =
    async (
      id: number,
      estado: Estado
    ) => {
      await actualizar(id, {
        estado,
      });
    };

  const eliminar = async (
    id: number
  ) => {
    await tareaService.remove(id);

    setTareas((prev) =>
      prev.filter(
        (t) => t.id !== id
      )
    );
  };

  return {
    tareas,
    loading,
    error,
    crear,
    actualizar,
    actualizarEstado,
    eliminar,
  };
};