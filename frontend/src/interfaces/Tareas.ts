export type Estado =
  | "PENDIENTE"
  | "EN_PROGRESO"
  | "COMPLETADA";

export interface Tarea {
  id: number;
  titulo: string;
  descripcion?: string;
  estado: Estado;

  proyectoId: number;
  usuarioId?: number;

  proyecto?: {
    nombre: string;
  };

  usuario?: {
    nombre: string;
  };
}

export interface CrearTareaDTO {
  titulo: string;
  descripcion?: string;
  estado?: Estado;
  proyectoId: number;
  usuarioId?: number;
}

export interface ActualizarTareaDTO {
  titulo?: string;
  descripcion?: string;
  estado?: Estado;
  proyectoId?: number;
  usuarioId?: number;
}