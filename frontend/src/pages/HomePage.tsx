import { Link } from "react-router-dom";

export default function HomePage() {
  return (
    <div className="space-y-10">
      <section className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-3xl p-10">
        <h1 className="text-4xl font-bold mb-4">
          Bienvenido a TaskFlow
        </h1>

        <p className="text-lg opacity-90 max-w-2xl">
          Plataforma de gestión de proyectos para administrar usuarios,
          proyectos y tareas de forma simple y profesional.
        </p>

        <div className="flex gap-4 mt-6">
          <Link
            to="/usuarios"
            className="bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold"
          >
            Usuarios
          </Link>

          <Link
            to="/proyectos"
            className="bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold"
          >
            Proyectos
          </Link>

          <Link
            to="/tareas"
            className="bg-white text-blue-600 px-5 py-3 rounded-xl font-semibold"
          >
            Tareas
          </Link>
        </div>
      </section>

      <section className="grid md:grid-cols-4 gap-5">
        <Card title="Usuarios" value="CRUD" />
        <Card title="Proyectos" value="Control" />
        <Card title="Tareas" value="Seguimiento" />
        <Card title="Stack" value="React + Node" />
      </section>
    </div>
  );
}

function Card({
  title,
  value,
}: {
  title: string;
  value: string;
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border p-6">
      <p className="text-slate-500 text-sm">{title}</p>
      <h3 className="text-2xl font-bold mt-2">{value}</h3>
    </div>
  );
}