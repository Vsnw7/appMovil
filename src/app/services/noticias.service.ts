import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Noticia } from '../interfaces/noticia.interface';

@Injectable({
  providedIn: 'root'
})
export class NoticiasService {

  constructor(private firestore: Firestore) {}

  // Obtiene todos los documentos de la colección 'noticias'.
// Retorna un Observable con un arreglo de objetos Noticia, incluyendo el campo 'id'.
  getNoticias(): Observable<Noticia[]> {
    const noticiasRef = collection(this.firestore, 'noticias'); // Nombre de tu colección
    return collectionData(noticiasRef, { idField: 'id' }) as Observable<Noticia[]>;
  }
}
