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

  @Input() post!: Post;
  @Input() currentUser: any;

  comentarios$!: Observable<Comentario[]>;
  nuevoComentario: string = '';

  constructor(
    private modalCtrl: ModalController,
    private foroService: ForoService
  ) { }

  ngOnInit() {
    if(this.post?.id) {
      this.comentarios$ = this.foroService.getComentarios(this.post.id);
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }

  enviarComentario() {
    if (!this.nuevoComentario.trim() || !this.post.id) return;

    // Usamos datos del usuario (o valores por defecto si no están disponibles)
    const nombre = this.currentUser?.displayName || 'Usuario';
    const foto = this.currentUser?.photoURL || null;

    const comentario: Comentario = {
      autorId: this.currentUser.uid,
      autorNombre: nombre,
      autorFoto: foto, 
      texto: this.nuevoComentario,
      fecha: null
    };

    this.foroService.addComentario(this.post.id, comentario, this.post.autorId)
      .then(() => {
        this.nuevoComentario = '';
      });
  }
}