export interface Post {
  id?: string;
  autorId: string;
  autorNombre: string;
  autorFoto?: string;
  contenido: string;
  fecha: any;
  likes: string[];
  comentariosCount: number;
}

export interface Comentario {
  id?: string;
  autorId: string;
  autorNombre: string;
  autorFoto?: string; // Foto del usuario en el comentario
  texto: string;
  fecha: any;
}

export interface Notificacion {
  id?: string;
  paraUsuarioId: string;
  deUsuarioId: string;
  mensaje: string;
  tipo: 'like' | 'comentario';
  postId: string; // ID para la redirección
  leido: boolean;
  fecha: any;
}