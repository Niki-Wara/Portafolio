export interface Proyecto {
  id: number;
  nombre: string;
  descripcion?: string;
  usuarioId: number;

  usuario?: {
    nombre: string;
    email?: string;
  };
}

export interface CrearProyectoDTO {
  nombre: string;
  descripcion?: string;
  usuarioId: number;
}

export interface ActualizarProyectoDTO {
  nombre?: string;
  descripcion?: string;
  usuarioId?: number;
}