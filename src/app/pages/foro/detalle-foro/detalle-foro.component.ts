import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { ForoService } from 'src/app/services/foro';
import { Post, Comentario } from 'src/app/interfaces/foro.interface';
import { Observable } from 'rxjs';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-detalle-foro',
  templateUrl: './detalle-foro.component.html',
  styleUrls: ['./detalle-foro.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule]
})
export class DetalleForoComponent implements OnInit {

  // Post que se va a mostrar en el modal (recibido desde el componente padre)
  @Input() post!: Post;

  // Usuario actualmente autenticado
  @Input() currentUser: any;

  // Observable que carga los comentarios del post
  comentarios$!: Observable<Comentario[]>;

  // Texto del nuevo comentario que el usuario está escribiendo
  nuevoComentario: string = '';

  constructor(
    private modalCtrl: ModalController, // Controlador para abrir/cerrar modales
    private foroService: ForoService    // Servicio que maneja lógica del foro
  ) { }

  ngOnInit() {
    // Si el post tiene ID, cargamos sus comentarios en un observable
    if(this.post?.id) {
      this.comentarios$ = this.foroService.getComentarios(this.post.id);
    }
  }

  // Cierra el modal de detalles del post
  cerrar() {
    this.modalCtrl.dismiss();
  }

  // Envía un comentario al post
  enviarComentario() {
    // Validación: evitar enviar vacío o sin ID de post
    if (!this.nuevoComentario.trim() || !this.post.id) return;

    // Datos del usuario (si faltan, se colocan valores por defecto)
    const nombre = this.currentUser?.displayName || 'Usuario';
    const foto = this.currentUser?.photoURL || null;

    // Construcción del objeto Comentario según la interfaz
    const comentario: Comentario = {
      autorId: this.currentUser.uid,
      autorNombre: nombre,
      autorFoto: foto, 
      texto: this.nuevoComentario,
      fecha: null // La fecha se genera dentro del servicio
    };

    // Guardar el comentario en Firestore y notificar al autor del post
    this.foroService.addComentario(this.post.id, comentario, this.post.autorId)
      .then(() => {
        // Limpiar el campo después de enviar
        this.nuevoComentario = '';
      });
  }
}
