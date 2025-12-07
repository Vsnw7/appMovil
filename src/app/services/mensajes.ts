import { Injectable } from '@angular/core';
import { Firestore,collection,collectionData,doc,docData,updateDoc,increment } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class Mensajes {
  constructor(private firestore: Firestore) {}
  // Obtiene todos los documentos de la colección 'mensajes'.
// Retorna un Observable con los datos y agrega el campo 'id' automáticamente.
  getMensajes() {
    const mensajesRef = collection(this.firestore, 'mensajes');
    return collectionData(mensajesRef, { idField: 'id' });
  }
  // Incrementa en +1 el campo 'likes' del documento indicado por su ID.
  updateLike(id: string) {
  const mensajeRef = doc(this.firestore, 'mensajes', id);
  return updateDoc(mensajeRef, {
    likes: increment(1)
  });
}
// Incrementa en +1 el campo 'dislikes' del documento indicado por su ID.
updateDislike(id: string) {
    const mensajeRef = doc(this.firestore, 'mensajes', id);
    return updateDoc(mensajeRef, {
      dislikes: increment(1)
    });
  }

  
}
