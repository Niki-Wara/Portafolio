import { useForm } from "react-hook-form";
import Button from "../ui/Button";
import type { Tarea, ActualizarTareaDTO } from "../../interfaces/Tareas";

interface Props {
  tarea: Tarea;
  onSubmit: (data: ActualizarTareaDTO) => Promise<void>;
  onCancel: () => void;
}

export default function EditarTareaForm({
  tarea,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActualizarTareaDTO>({
    defaultValues: {
      titulo: tarea.titulo,
      descripcion: tarea.descripcion,
      estado: tarea.estado,
      usuarioId: tarea.usuarioId,
      proyectoId: tarea.proyectoId,
    },
  });

  const campo =
    "block w-full px-3 py-2 rounded-lg border text-sm focus:ring-2 focus:ring-blue-500";

  const normal = "border-slate-200 bg-white";
  const error = "border-red-400 bg-red-50";

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="block text-sm font-medium mb-1">
          Título
        </label>

        <input
          {...register("titulo", {
            required: "Título obligatorio",
          })}
          className={`${campo} ${
            errors.titulo ? error : normal
          }`}
        />

        {errors.titulo && (
          <p className="text-red-500 text-xs mt-1">
            {errors.titulo.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Descripción
        </label>

        <textarea
          {...register("descripcion")}
          className={`${campo} ${normal}`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Estado
        </label>

        <select
          {...register("estado")}
          className={`${campo} ${normal}`}
        >
          <option value="PENDIENTE">
            Pendiente
          </option>

          <option value="EN_PROGRESO">
            En progreso
          </option>

          <option value="COMPLETADA">
            Completada
          </option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Usuario ID
        </label>

        <input
          type="number"
          {...register("usuarioId", {
            valueAsNumber: true,
          })}
          className={`${campo} ${normal}`}
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Proyecto ID
        </label>

        <input
          type="number"
          {...register("proyectoId", {
            valueAsNumber: true,
          })}
          className={`${campo} ${normal}`}
        />
      </div>

      <div className="flex gap-3 pt-2">
        <Button
          type="submit"
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Guardando..."
            : "Guardar"}
        </Button>

        <Button
          type="button"
          variant="ghost"
          onClick={onCancel}
        >
          Cancelar
        </Button>
      </div>
    </form>
  );
}