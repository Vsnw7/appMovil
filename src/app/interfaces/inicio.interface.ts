export interface HeroContent {
  id?: string;         // id del documento
  title: string;       // Título principal
  subtitle: string;    // Texto descriptivo
  imageUrl: string;    // URL de la imagen
  buttonLabel: string; // Texto del botón
}

export interface HistoriaContent {
  id?: string;
  title: string;
  text: string;
  imageUrl?: string;  // Opcional si quieres imagenes en la historia
}
