import { Injectable } from '@angular/core';
import { Firestore,collection,collectionData,doc,docData,updateDoc,increment } from '@angular/fire/firestore';




@Injectable({
  providedIn: 'root',
})
export class Mensajes {
  constructor(private firestore: Firestore) {}
  getMensajes() {
    const mensajesRef = collection(this.firestore, 'mensajes');
    return collectionData(mensajesRef, { idField: 'id' });
  }
  updateLike(id: string) {
  const mensajeRef = doc(this.firestore, 'mensajes', id);
  return updateDoc(mensajeRef, {
    likes: increment(1)
  });
}
updateDislike(id: string) {
    const mensajeRef = doc(this.firestore, 'mensajes', id);
    return updateDoc(mensajeRef, {
      dislikes: increment(1)
    });
  }

  
}
