import { Injectable } from '@angular/core';
import { 
  Firestore, collection, addDoc, collectionData, doc, updateDoc, docData, 
  arrayUnion, arrayRemove, increment, serverTimestamp, 
  query, orderBy 
} from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Post, Comentario, Notificacion } from '../interfaces/foro.interface'; 

@Injectable({
  providedIn: 'root'
})
export class ForoService {

  constructor(private firestore: Firestore) { }

  // ================= POSTS =================

  // Obtiene todos los posts en tiempo real (Observable)
  getPosts(): Observable<Post[]> {
    const postsRef = collection(this.firestore, 'posts');
    const q = query(postsRef, orderBy('fecha', 'desc')); // Ordenamos del más reciente al más antiguo
    return collectionData(q, { idField: 'id' }) as Observable<Post[]>;
  }

  // Obtener un post por ID (Útil para ir directo al post desde una notificación)
  getPostById(id: string): Observable<Post> {
    const postDocRef = doc(this.firestore, `posts/${id}`);
    return docData(postDocRef, { idField: 'id' }) as Observable<Post>;
  }

  // Crea un nuevo post en la colección raíz
  addPost(post: Post) {
    const postsRef = collection(this.firestore, 'posts');
    return addDoc(postsRef, {
      ...post,
      fecha: serverTimestamp(), // Usamos la hora del servidor para evitar problemas de zona horaria
      likes: [],                // Inicializamos el array de likes vacío
      comentariosCount: 0       // Inicializamos el contador en 0
    });
  }

  // ================= LIKES =================

  // Lógica inteligente: Si ya dio like lo quita, si no, lo agrega
  async toggleLike(post: Post, currentUserId: string) {
    if (!post.id) return; 
    
    const postRef = doc(this.firestore, `posts/${post.id}`);
    // Verificamos localmente si el usuario ya está en el array
    const yaDioLike = post.likes.includes(currentUserId);

    if (yaDioLike) {
      // QUITAR LIKE: arrayRemove saca el ID del array atómicamente
      await updateDoc(postRef, {
        likes: arrayRemove(currentUserId)
      });
    } else {
      // DAR LIKE: arrayUnion agrega el ID (evita duplicados)
      await updateDoc(postRef, {
        likes: arrayUnion(currentUserId)
      });
      
      // Si el like no es a uno mismo, enviamos notificación
      if (post.autorId !== currentUserId) {
        this.crearNotificacion(post.autorId, currentUserId, 'Le gustó tu publicación', 'like', post.id);
      }
    }
  }

  // ================= COMENTARIOS =================

  // Obtiene la subcolección de comentarios dentro de un post específico
  getComentarios(postId: string): Observable<Comentario[]> {
    const comRef = collection(this.firestore, `posts/${postId}/comentarios`);
    const q = query(comRef, orderBy('fecha', 'asc')); // Los comentarios suelen leerse del más viejo al nuevo
    return collectionData(q, { idField: 'id' }) as Observable<Comentario[]>;
  }

  // Realiza 3 acciones: Guarda comentario, actualiza contador del post y notifica
  async addComentario(postId: string, comentario: Comentario, postAutorId: string) {
    // 1. Guardar el comentario en la subcolección
    await addDoc(collection(this.firestore, `posts/${postId}/comentarios`), {
      ...comentario,
      fecha: serverTimestamp()
    });

    // 2. Actualizar el contador en el documento PADRE (Post)
    // 'increment(1)' es más seguro que leer el valor actual y sumarle 1 manualmente
    await updateDoc(doc(this.firestore, `posts/${postId}`), {
      comentariosCount: increment(1)
    });

    // 3. Crear notificación si el comentario no es propio
    if (postAutorId !== comentario.autorId) {
      this.crearNotificacion(postAutorId, comentario.autorId, 'Comentó tu publicación', 'comentario', postId);
    }
  }

  // ================= NOTIFICACIONES =================

  // Método privado auxiliar para escribir en la subcolección del usuario destino
  private crearNotificacion(paraUid: string, deUid: string, msj: string, tipo: 'like' | 'comentario', postId: string) {
    if (paraUid === deUid) return; // Doble chequeo para no auto-notificarse

    // Se guarda en: users/{id}/notificaciones
    const notiRef = collection(this.firestore, `users/${paraUid}/notificaciones`);
    addDoc(notiRef, {
      paraUsuarioId: paraUid,
      deUsuarioId: deUid,
      mensaje: msj,
      tipo,
      postId, // Guardamos el ID del post para poder redirigir al usuario luego
      leido: false,
      fecha: serverTimestamp()
    });
  }

  // Obtiene las notificaciones del usuario logueado
  getNotificaciones(userId: string): Observable<Notificacion[]> {
    const notiRef = collection(this.firestore, `users/${userId}/notificaciones`);
    const q = query(notiRef, orderBy('fecha', 'desc'));
    return collectionData(q, { idField: 'id' }) as Observable<Notificacion[]>;
  }

  // Actualiza el estado de 'leido' a true
  marcarLeida(userId: string, notiId: string) {
    const docRef = doc(this.firestore, `users/${userId}/notificaciones/${notiId}`);
    return updateDoc(docRef, { leido: true });
  }
}