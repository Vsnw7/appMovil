import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { GaleriaImagen, GaleriaVideo } from '../interfaces/galeria.interface';

@Injectable({
  providedIn: 'root'
})
export class GaleriaService {

  constructor(private firestore: Firestore) {}

 // Leer imágenes desde la colección 'galeria_imagenes' de Firestore.
// Retorna un Observable que emite un arreglo de objetos GaleriaImagen.
  getImagenes(): Observable<GaleriaImagen[]> {
    const ref = collection(this.firestore, 'galeria_imagenes');
    return collectionData(ref, { idField: 'id' }) as Observable<GaleriaImagen[]>;
  }

 // Leer videos desde la colección 'videos' de Firestore.
// Retorna un Observable que emite un arreglo de objetos GaleriaVideo.
  getVideos(): Observable<GaleriaVideo[]> {
    const ref = collection(this.firestore, 'videos');
    return collectionData(ref, { idField: 'id' }) as Observable<GaleriaVideo[]>;
  }
}
