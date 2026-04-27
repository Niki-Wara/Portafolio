import { useEffect, useState } from "react";
import { proyectoService } from "../services/proyectoService";
import type {
  Proyecto,
  CrearProyectoDTO,
} from "../interfaces/Proyectos";

export const useProyectos = () => {
  const [proyectos, setProyectos] = useState<Proyecto[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cargar = async () => {
    try {
      setLoading(true);
      const data = await proyectoService.getAll();
      setProyectos(data);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    cargar();
  }, []);

  const crear = async (payload: CrearProyectoDTO) => {
    const nuevo = await proyectoService.create(payload);
    setProyectos((prev) => [...prev, nuevo]);
  };

  const eliminar = async (id: number) => {
    await proyectoService.remove(id);
    setProyectos((prev) =>
      prev.filter((p) => p.id !== id)
    );
  };
  const actualizar = async (
    id:number,
    payload:any
  ) => {
    const actualizado =
      await proyectoService.update(id,payload);
  
    setProyectos((prev)=>
      prev.map((p)=>
        p.id === id ? actualizado : p
      )
    );
  };
  return {
    proyectos,
    loading,
    error,
    crear,
    actualizar,
    eliminar
  };
};