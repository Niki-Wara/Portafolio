import { useForm } from "react-hook-form";
import type {
  CrearProyectoDTO
} from "../../interfaces/Proyectos";

interface Props {
  onSubmit: (
    data: CrearProyectoDTO
  ) => Promise<void>;

  onCancel: () => void;
}

export default function ProyectoForm({
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: {
      errors,
      isSubmitting,
    },
  } = useForm<CrearProyectoDTO>();

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <input
        {...register("nombre", {
          required: true,
        })}
        placeholder="Nombre"
        className="w-full border p-2 rounded-xl"
      />

      <textarea
        {...register("descripcion")}
        placeholder="Descripción"
        className="w-full border p-2 rounded-xl"
      />

      <input
        type="number"
        {...register("usuarioId", {
          required: true,
          valueAsNumber: true,
        })}
        placeholder="Usuario ID"
        className="w-full border p-2 rounded-xl"
      />

      <div className="flex gap-3">
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded-xl"
        >
          {isSubmitting
            ? "Guardando..."
            : "Guardar"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="bg-slate-200 px-4 py-2 rounded-xl"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}