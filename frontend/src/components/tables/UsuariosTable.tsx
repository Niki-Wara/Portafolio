import { Pencil, Trash2, Users } from "lucide-react";
import type { Usuario } from "../../interfaces/Usuarios";
import Button from "../ui/Button";
import EmptyState from "../ui/EmptyState";

interface Props {
  usuarios: Usuario[];
  loading: boolean;
  onEliminar: (id: number) => void;
  onEditar: (usuario: Usuario) => void;
}

export default function UsuariosTable({
  usuarios,
  loading,
  onEditar,
  onEliminar,
}: Props) {
  if (loading) {
    return (
      <div className="bg-white rounded-2xl shadow p-6 text-center text-slate-500">
        Cargando usuarios...
      </div>
    );
  }

  if (!usuarios.length) {
    return (
      <EmptyState
        icon={Users}
        title="Sin usuarios"
        description="Crea el primer usuario"
      />
    );
  }

  return (
    <div className="bg-white rounded-2xl shadow overflow-hidden">
      <table className="w-full">
        <thead className="bg-slate-100 text-slate-700 text-sm">
          <tr>
            <th className="text-left px-6 py-4">Nombre</th>
            <th className="text-left px-6 py-4">Correo</th>
            <th className="text-center px-6 py-4">Acciones</th>
          </tr>
        </thead>

        <tbody>
          {usuarios.map((u) => (
            <tr
              key={u.id}
              className="border-t hover:bg-slate-50 transition"
            >
              <td className="px-6 py-4 font-medium text-slate-800">
                {u.nombre}
              </td>

              <td className="px-6 py-4 text-slate-600">
                {u.email}
              </td>

              <td className="px-6 py-4">
                <div className="flex justify-center gap-2">
                  <Button onClick={() => onEditar(u)}>
                    <Pencil size={15} />
                  </Button>

                  <Button onClick={() => onEliminar(u.id)}>
                    <Trash2 size={15} />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}