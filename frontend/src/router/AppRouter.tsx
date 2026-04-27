import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "../components/layout/Layout";

import HomePage from "../pages/HomePage";
import UsuariosPage from "../pages/UsuariosPage";
import ProyectosPage from "../pages/ProyectosPage";
import TareasPage from "../pages/TareasPage";
import NotFoundPage from "../pages/NotFoundPage";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/usuarios" element={<UsuariosPage />} />
          <Route path="/proyectos" element={<ProyectosPage />} />
          <Route path="/tareas" element={<TareasPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}