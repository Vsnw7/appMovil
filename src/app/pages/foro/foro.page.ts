import { Component, OnInit } from '@angular/core';
// IMPORTACIÓN CORREGIDA
import { ForoService } from 'src/app/services/foro'; 
import { Usuarios } from 'src/app/services/usuarios';
import { Post } from 'src/app/interfaces/foro.interface';
import { ModalController, ToastController } from '@ionic/angular';
import { DetalleForoComponent } from './detalle-foro/detalle-foro.component';

@Component({
  standalone: false,
  selector: 'app-foro',
  templateUrl: './foro.page.html',
  styleUrls: ['./foro.page.scss'],
})
export class ForoPage implements OnInit {

  posts: Post[] = [];
  postsFiltrados: Post[] = [];
  nuevoPost: string = '';
  currentUser: any = null;

  constructor(
    private foroService: ForoService,
    private usuariosService: Usuarios,
    private modalCtrl: ModalController,
    private toastCtrl: ToastController
  ) { }
 
  ngOnInit() {
    this.usuariosService.getAuth().subscribe(user => {
      this.currentUser = user;
    });

    // TIPO EXPLÍCITO AÑADIDO: (data: Post[])
    this.foroService.getPosts().subscribe((data: Post[]) => {
      this.posts = data;
      this.postsFiltrados = data;
    }); 
  }

  // ... (El resto de tus funciones buscarPost, publicar, darLike, etc. se quedan igual)
  buscarPost(event: any) {
    const texto = event.detail.value.toLowerCase();
    if (texto === '') {
      this.postsFiltrados = this.posts;
    } else {
      this.postsFiltrados = this.posts.filter(p => {
        return p.contenido.toLowerCase().includes(texto) || 
               p.autorNombre.toLowerCase().includes(texto);
      });
    }
  }

  async publicar() {
    if (!this.nuevoPost.trim() || !this.currentUser) return;
    const post: Post = {
      autorId: this.currentUser.uid,
      autorNombre: this.currentUser.displayName || 'Usuario',
      autorFoto: this.currentUser.photoURL,
      contenido: this.nuevoPost,
      fecha: null,
      likes: [],
      comentariosCount: 0
    };
    try {
      await this.foroService.addPost(post);
      this.nuevoPost = '';
      this.presentToast('Publicado correctamente');
    } catch (e) {
      console.error(e);
    }
  }

  darLike(post: Post) {
    if (!this.currentUser) return;
    this.foroService.toggleLike(post, this.currentUser.uid);
  }

  async abrirComentarios(post: Post) {
    const modal = await this.modalCtrl.create({
      component: DetalleForoComponent,
      componentProps: { post: post, currentUser: this.currentUser }
    });
    await modal.present();
  }

  async presentToast(msg: string) {
    const t = await this.toastCtrl.create({ message: msg, duration: 1500 });
    t.present();
  }
}