import axiosInstance from "../api/axiosInstance";
import type {
  Proyecto,
  CrearProyectoDTO,
} from "../interfaces/Proyectos";

export const proyectoService = {
  getAll: async (): Promise<Proyecto[]> => {
    const { data } = await axiosInstance.get("/proyectos");
    return data;
  },

  create: async (
    payload: CrearProyectoDTO
  ): Promise<Proyecto> => {
    const { data } = await axiosInstance.post(
      "/proyectos",
      payload
    );
    return data;
  },

  remove: async (id: number) => {
    await axiosInstance.delete(`/proyectos/${id}`);
  },
  update: async (id:number,payload:any) => {
    const { data } =
      await axiosInstance.patch(
        `/proyectos/${id}`,
        payload
      );
  
    return data;
  },
};