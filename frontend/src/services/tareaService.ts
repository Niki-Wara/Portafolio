import axiosInstance from "../api/axiosInstance";
import type {
  Tarea,
  CrearTareaDTO,
  ActualizarTareaDTO,
  Estado,
} from "../interfaces/Tareas";

export const tareaService = {
  getAll: async (): Promise<Tarea[]> => {
    const { data } =
      await axiosInstance.get("/tareas");
    return data;
  },

  create: async (
    payload: CrearTareaDTO
  ): Promise<Tarea> => {
    const { data } =
      await axiosInstance.post(
        "/tareas",
        payload
      );

    return data;
  },

  update: async (
    id: number,
    payload: ActualizarTareaDTO
  ): Promise<Tarea> => {
    const { data } =
      await axiosInstance.patch(
        `/tareas/${id}`,
        payload
      );

    return data;
  },

  updateEstado: async (
    id: number,
    estado: Estado
  ): Promise<Tarea> => {
    const { data } =
      await axiosInstance.patch(
        `/tareas/${id}`,
        { estado }
      );

    return data;
  },

  remove: async (id: number) => {
    await axiosInstance.delete(
      `/tareas/${id}`
    );
  },
};