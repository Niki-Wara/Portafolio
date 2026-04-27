import { useForm } from "react-hook-form";
import type {
  Usuario,
  ActualizarUsuarioDTO,
} from "../../interfaces/Usuarios";

interface Props {
  usuario: Usuario;
  onSubmit: (data: ActualizarUsuarioDTO) => Promise<void>;
  onCancel: () => void;
}

const campo =
  "w-full px-4 py-2 border rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500";

const normal = "border-slate-300";

const error = "border-red-500";

export default function EditarUsuarioForm({
  usuario,
  onSubmit,
  onCancel,
}: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ActualizarUsuarioDTO>({
    defaultValues: {
      nombre: usuario.nombre,
      email: usuario.email,
    },
  });
  const campo = "block w-full px-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-blue-500";
  const error = "border-red-400 bg-red-50";
  const normal = "border-slate-200 bg-white";
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Nombre
        </label>

        <input
          {...register("nombre", {
            required: "El nombre es obligatorio",
            minLength: {
              value: 2,
              message: "El nombre debe tener al menos 2 caracteres",
            },
          })}
          className={`${campo} ${errors.nombre ? error : normal}`}
          placeholder="Juan Pérez"
        />

        {errors.nombre && (
          <p className="text-red-500 text-sm mt-1">
            {errors.nombre.message}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-slate-700 mb-1">
          Contraseña
        </label>

        <input
          {...register("password", {
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
          type="password"
          className={`${campo} ${errors.password ? error : normal}`}
          placeholder="********"
        />

        {errors.password && (
          <p className="text-red-500 text-sm mt-1">
            {errors.password.message}
          </p>
        )}
      </div>

      <div className="flex gap-3 pt-2">
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-4 py-2 bg-blue-600 text-white rounded-xl disabled:opacity-50"
        >
          {isSubmitting ? "Guardando..." : "Guardar cambios"}
        </button>

        <button
          type="button"
          onClick={onCancel}
          className="px-4 py-2 bg-slate-100 text-slate-700 rounded-xl"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
}