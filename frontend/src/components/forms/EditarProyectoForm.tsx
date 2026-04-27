import { useForm } from "react-hook-form";
import Button from "../ui/Button";

interface Proyecto {
  id: number;
  nombre: string;
  descripcion?: string;
  usuarioId: number;
}

interface Props {
  proyecto: Proyecto;
  onSubmit: (data: any) => Promise<void>;
  onCancel: () => void;
}

export default function EditarProyectoForm({
  proyecto,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      nombre: proyecto.nombre,
      descripcion: proyecto.descripcion,
      usuarioId: proyecto.usuarioId,
    },
  });

  const campo =
    "block w-full px-3 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-blue-500";

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

      <div>
        <label>Nombre</label>
        <input
          {...register("nombre", { required: true })}
          className={campo}
        />
      </div>

      <div>
        <label>Descripción</label>
        <textarea
          {...register("descripcion")}
          className={campo}
        />
      </div>

      <div>
        <label>Usuario ID</label>
        <input
          type="number"
          {...register("usuarioId", {
            valueAsNumber: true
          })}
          className={campo}
        />
      </div>

      <div className="flex gap-3">
        <Button type="submit" disabled={isSubmitting}>
          Guardar
        </Button>

        <Button type="button" variant="ghost" onClick={onCancel}>
          Cancelar
        </Button>
      </div>
    </form>
  );
}