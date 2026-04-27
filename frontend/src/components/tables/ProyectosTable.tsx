import { Pencil, Trash2, FolderKanban } from "lucide-react";
import type { Proyecto } from "../../interfaces/Proyectos";
import EmptyState from "../ui/EmptyState";
import Button from "../ui/Button";

interface Props {
  proyectos: Proyecto[];
  loading: boolean;
  onEditar: (proyecto: Proyecto) => void;
  onEliminar: (id: number) => void;
}

export default function ProyectosTable({
  proyectos,
  loading,
  onEditar,
  onEliminar,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl border p-6 text-center text-slate-500">
        Cargando proyectos...
      </div>
    );
  }

  if (!proyectos.length) {
    return (
      <EmptyState
        icon={FolderKanban}
        title="Sin proyectos"
        description="Crea tu primer proyecto"
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl border overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100">
          <tr>
            <th className="p-3 text-left">ID</th>
            <th className="p-3 text-left">Nombre</th>
            <th className="p-3 text-left">Descripción</th>
            <th className="p-3 text-left">Responsable</th>
            <th className="p-3 text-left">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {proyectos.map((p) => (
            <tr
              key={p.id}
              className="border-t hover:bg-slate-50"
            >
              <td className="p-3">{p.id}</td>

              <td className="p-3 font-medium">
                {p.nombre}
              </td>

              <td className="p-3 text-slate-600">
                {p.descripcion || "-"}
              </td>

              <td className="p-3">
                {p.usuario?.nombre || "-"}
              </td>

              <td className="p-3 flex gap-2">
                <Button
                  onClick={() => onEditar(p)}
                >
                  <Pencil size={15} />
                </Button>

                <Button
                  onClick={() =>
                    onEliminar(p.id)
                  }
                >
                  <Trash2 size={15} />
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}