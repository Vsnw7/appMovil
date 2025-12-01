export interface GaleriaImagen {
  id: string;
  titulo: string;
  descripcion: string;
  categoria: string;
  contenido: string;
  url_imagen: string;
  estado: string;
  fecha_publicacion: any;
  fecha_subida: any;
  id_admin_subio: string;
}

export interface GaleriaVideo {
  id: string;
  titulo: string;
  descripcion: string;
  video: string;
  estado?: string;
  fecha_publicacion: any;
  id_admin_subio: string;
}
