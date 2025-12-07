import { Component, OnInit } from '@angular/core';
// IMPORTACIÓN CORREGIDA
// Importamos los servicios que conectan con la base de datos (Foro) y la autenticación (Usuarios)
import { ForoService } from 'src/app/services/foro'; 
import { Usuarios } from 'src/app/services/usuarios';
// Interfaces para mantener el tipado fuerte de datos
import { Post } from 'src/app/interfaces/foro.interface';
// Controladores de UI de Ionic: Ventanas modales y mensajes emergentes (Toasts)
import { ModalController, ToastController } from '@ionic/angular';
// El componente que se abrirá al querer ver detalles/comentarios
import { DetalleForoComponent } from './detalle-foro/detalle-foro.component';

@Component({
  standalone: false,
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {

  // Almacena TODOS los posts traídos de la BD (fuente de verdad)
  posts: Post[] = [];
  // Almacena los posts que se muestran en pantalla (puede variar si el usuario usa el buscador)
  postsFiltrados: Post[] = [];
  // Variable vinculada al input del formulario (ngModel) para escribir un nuevo post
  nuevoPost: string = '';
  // Guarda la información del usuario logueado para asignar autoría a los posts/likes
  currentUser: any = null;

  constructor(
    private foroService: ForoService,     // Servicio de lógica del foro
    private usuariosService: Usuarios,    // Servicio de autenticación
    private modalCtrl: ModalController,   // Para abrir popups
    private toastCtrl: ToastController    // Para mostrar mensajes temporales
  ) { }
  
  ngOnInit() {
    // 1. Suscribirse al estado de autenticación para saber quién está navegando
    this.usuariosService.getAuth().subscribe(user => {
      this.currentUser = user;
    });

    // 2. Suscribirse a la lista de posts en tiempo real
    // TIPO EXPLÍCITO AÑADIDO: (data: Post[])
    this.foroService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;           // Guardamos la data original
      this.postsFiltrados = data;  // Inicialmente mostramos todos (sin filtrar)
    }); 
  }

  // ... (El resto de tus funciones buscarPost, publicar, darLike, etc. se quedan igual)

  // Función para filtrar la lista visual según lo que escriba el usuario en la barra de búsqueda
  buscarPost(event: any) {
    const texto = event.detail.value.toLowerCase(); // Convertimos a minúsculas para búsqueda insensible a mayúsculas
    
    if (texto === '') {
      // Si borran el texto, restauramos la lista completa
      this.postsFiltrados = this.posts;
    } else {
      // Filtramos si el texto coincide con el contenido O con el nombre del autor
      this.postsFiltrados = this.posts.filter(p => {
        return p.contenido.toLowerCase().includes(texto) || 
               p.autorNombre.toLowerCase().includes(texto);
      });
    }
  }

  // Lógica para enviar un nuevo post a Firebase
  async publicar() {
    // Validaciones: que no esté vacío y que haya usuario logueado
    if (!this.nuevoPost.trim() || !this.currentUser) return;

    // Construcción del objeto Post
    const post: Post = {
      autorId: this.currentUser.uid,
      autorNombre: this.currentUser.displayName || 'Usuario',
      autorFoto: this.currentUser.photoURL,
      contenido: this.nuevoPost,
      fecha: null, // El servidor pondrá la fecha (serverTimestamp)
      likes: [],
      comentariosCount: 0
    };

    try {
      // Enviamos al servicio
      await this.foroService.addPost(post);
      // Limpiamos el input y avisamos éxito
      this.nuevoPost = '';
      this.presentToast('Publicado correctamente');
    } catch (e) {
      console.error(e);
    }
  }

  // Maneja el botón de "Me gusta"
  darLike(post: Post) {
    if (!this.currentUser) return; // Seguridad extra
    // Delega la lógica de agregar/quitar like al servicio
    this.foroService.toggleLike(post, this.currentUser.uid);
  }

  // Abre el componente hijo (DetalleForo) en una ventana flotante
  async abrirComentarios(post: Post) {
    const modal = await this.modalCtrl.create({
      component: DetalleForoComponent,
      // Pasamos el post seleccionado y el usuario actual al modal
      componentProps: { post: post, currentUser: this.currentUser }
    });
    await modal.present();
  }

  // Utilidad para mostrar mensajitos breves abajo (Feedback al usuario)
  async presentToast(msg: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 1500 });
    t.present();
  }
}