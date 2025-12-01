import { Injectable } from '@angular/core';
import { 
  Firestore, collection, addDoc, collectionData, doc, updateDoc, docData, 
  arrayUnion, arrayRemove, increment, serverTimestamp, 
  query, orderBy 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post, Comentario, Notificacion } from '../interfaces/foro.interface'; // Asegúrate que esta ruta sea correcta

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private firestore: Firestore) { }

  // ================= POSTS =================

  getPosts(): Observable<Post[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, orderBy('fecha', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Post[]>;
  }

  // Obtener un post por ID (Para la redirección desde notificaciones)
  getPostById(id: string): Observable<Post> {
    const postDocRef = doc(this.firestore, `posts/${id}`);
    return docData(postDocRef, { idField: 'id' }) as Observable<Post>;
  }

  addPost(post: Post) {
    const postsRef = collection(this.firestore, 'posts');
    return addDoc(postsRef, {
      ...post,
      fecha: serverTimestamp(),
      likes: [],
      comentariosCount: 0
    });
  }

  // ================= LIKES =================

  async toggleLike(post: Post, currentUserId: string) {
    if (!post.id) return; // Validación extra
    const postRef = doc(this.firestore, `posts/${post.id}`);
    const yaDioLike = post.likes.includes(currentUserId);

    if (yaDioLike) {
      await updateDoc(postRef, {
        likes: arrayRemove(currentUserId)
      });
    } else {
      await updateDoc(postRef, {
        likes: arrayUnion(currentUserId)
      });
      if (post.autorId !== currentUserId) {
        this.crearNotificacion(post.autorId, currentUserId, 'Le gustó tu publicación', 'like', post.id);
      }
    }
  }

  // ================= COMENTARIOS =================

  getComentarios(postId: string): Observable<Comentario[]> {
    const comRef = collection(this.firestore, `posts/${postId}/comentarios`);
    const q = query(comRef, orderBy('fecha', 'asc'));
    return collectionData(q, { idField: 'id' }) as Observable<Comentario[]>;
  }

  async addComentario(postId: string, comentario: Comentario, postAutorId: string) {
    // 1. Agregar comentario
    await addDoc(collection(this.firestore, `posts/${postId}/comentarios`), {
      ...comentario,
      fecha: serverTimestamp()
    });

    // 2. Actualizar contador
    await updateDoc(doc(this.firestore, `posts/${postId}`), {
      comentariosCount: increment(1)
    });

    // 3. Notificar
    if (postAutorId !== comentario.autorId) {
      this.crearNotificacion(postAutorId, comentario.autorId, 'Comentó tu publicación', 'comentario', postId);
    }
  }

  // ================= NOTIFICACIONES =================

  private crearNotificacion(paraUid: string, deUid: string, msj: string, tipo: 'like' | 'comentario', postId: string) {
    if (paraUid === deUid) return;

    const notiRef = collection(this.firestore, `users/${paraUid}/notificaciones`);
    addDoc(notiRef, {
      paraUsuarioId: paraUid,
      deUsuarioId: deUid,
      mensaje: msj,
      tipo,
      postId,
      leido: false,
      fecha: serverTimestamp()
    });
  }

  getNotificaciones(userId: string): Observable<Notificacion[]> {
    const notiRef = collection(this.firestore, `users/${userId}/notificaciones`);
    const q = query(notiRef, orderBy('fecha', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Notificacion[]>;
  }

  marcarLeida(userId: string, notiId: string) {
    const docRef = doc(this.firestore, `users/${userId}/notificaciones/${notiId}`);
    return updateDoc(docRef, { leido: true });
  }
}