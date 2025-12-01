export interface Noticia {
  titulo: string;
  contenido: string;
  imagen: string;
  id_admin_autor: string;
  estado: string;
  fecha_publicacion: any; // Usamos any para manejar el Timestamp de Firebase fácilmente
}