import { Link } from "react-router-dom";

export default function NotFoundPage() {
  return (
    <div className="text-center py-20">
      <h1 className="text-5xl font-bold">404</h1>
      <p className="text-slate-500 mt-3">Página no encontrada</p>

      <Link
        to="/"
        className="inline-block mt-6 bg-blue-600 text-white px-5 py-3 rounded-xl"
      >
        Volver al inicio
      </Link>
    </div>
  );
}