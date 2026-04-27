import { useForm } from "react-hook-form";
import { useUsuarios } from "../../hooks/useUsuarios";
import { useProyectos } from "../../hooks/useProyectos";

export default function TareaForm({
  onSubmit,
}: any) {
  const { usuarios } =
    useUsuarios();

  const { proyectos } =
    useProyectos();

  const {
    register,
    handleSubmit,
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit(
        onSubmit
      )}
      className="space-y-4"
    >
      <input
        {...register("titulo")}
        placeholder="Título"
        className="w-full border p-3 rounded-xl"
      />

      <textarea
        {...register(
          "descripcion"
        )}
        placeholder="Descripción"
        className="w-full border p-3 rounded-xl"
      />

      <select
        {...register(
          "proyectoId",
          {
            valueAsNumber: true,
          }
        )}
        className="w-full border p-3 rounded-xl"
      >
        <option>
          Proyecto
        </option>

        {proyectos.map((p) => (
          <option
            key={p.id}
            value={p.id}
          >
            {p.nombre}
          </option>
        ))}
      </select>

      <select
        {...register(
          "usuarioId",
          {
            valueAsNumber: true,
          }
        )}
        className="w-full border p-3 rounded-xl"
      >
        <option value="">
          Sin asignar
        </option>

        {usuarios.map((u) => (
          <option
            key={u.id}
            value={u.id}
          >
            {u.nombre}
          </option>
        ))}
      </select>

      <button className="bg-blue-600 text-white w-full py-3 rounded-xl">
        Crear Tarea
      </button>
    </form>
  );
}