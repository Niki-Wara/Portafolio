import type {
    Tarea,
    Estado,
  } from "../../interfaces/Tareas";
  
  interface Props {
    tareas: Tarea[];
  
    onEstado: (
      id: number,
      estado: Estado
    ) => void;
  
    onEliminar: (
      id: number
    ) => void;
  
    onEditar: (
      tarea: Tarea
    ) => void;
  }
  
  export default function TareasTable({
    tareas,
    onEstado,
    onEliminar,
    onEditar,
  }: Props) {
    const color = (
      estado: Estado
    ) => {
      if (estado === "PENDIENTE") {
        return "bg-amber-100 text-amber-700";
      }
  
      if (estado === "EN_PROGRESO") {
        return "bg-blue-100 text-blue-700";
      }
  
      return "bg-green-100 text-green-700";
    };
  
    return (
      <div className="bg-white rounded-2xl border overflow-hidden shadow-sm">
        <table className="w-full">
          <thead className="bg-slate-100 text-sm">
            <tr>
              <th className="p-3 text-left">
                Título
              </th>
  
              <th className="p-3 text-left">
                Estado
              </th>
  
              <th className="p-3 text-left">
                Proyecto
              </th>
  
              <th className="p-3 text-left">
                Usuario
              </th>
  
              <th className="p-3 text-left">
                Acciones
              </th>
            </tr>
          </thead>
  
          <tbody>
            {tareas.map((t) => (
              <tr
                key={t.id}
                className="border-t hover:bg-slate-50"
              >
                <td className="p-3 font-medium">
                  {t.titulo}
                </td>
  
                <td className="p-3">
                  <span
                    className={`px-3 py-1 rounded-full text-xs font-medium ${color(
                      t.estado
                    )}`}
                  >
                    {t.estado}
                  </span>
                </td>
  
                <td className="p-3">
                  {t.proyecto?.nombre}
                </td>
  
                <td className="p-3">
                  {t.usuario?.nombre ||
                    "Sin asignar"}
                </td>
  
                <td className="p-3 flex gap-2">
                  <button
                    onClick={() =>
                      onEstado(
                        t.id,
                        "COMPLETADA"
                      )
                    }
                    className="px-2 py-1 rounded bg-green-100 text-green-700 text-sm"
                  >
                    ✔
                  </button>
  
                  <button
                    onClick={() =>
                      onEditar(t)
                    }
                    className="px-2 py-1 rounded bg-blue-100 text-blue-700 text-sm"
                  >
                    Editar
                  </button>
  
                  <button
                    onClick={() =>
                      onEliminar(t.id)
                    }
                    className="px-2 py-1 rounded bg-red-100 text-red-700 text-sm"
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }