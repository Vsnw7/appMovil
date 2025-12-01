import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
// IMPORTACIÓN CORREGIDA
import { ForoService } from 'src/app/services/foro'; 
import { Notificacion, Post } from 'src/app/interfaces/foro.interface';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { DetalleForoComponent } from 'src/app/pages/foro/detalle-foro/detalle-foro.component';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-notificaciones',
  templateUrl: './notificaciones.component.html',
  styleUrls: ['./notificaciones.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule]
})
export class NotificacionesComponent implements OnInit {

  @Input() userId!: string;
  listaNotificaciones: Notificacion[] = [];

  constructor(
    private modalCtrl: ModalController,
    private foroService: ForoService
  ) { }

  ngOnInit() {
    if (this.userId) {
      // TIPO EXPLÍCITO AÑADIDO: (data: Notificacion[])
      this.foroService.getNotificaciones(this.userId).subscribe((data: Notificacion[]) => {
        this.listaNotificaciones = data;
      });
    }
  }

  async revisarNotificacion(noti: Notificacion) {
    if (!noti.leido && noti.id) {
      this.foroService.marcarLeida(this.userId, noti.id);
    }

    if (noti.postId) {
      // TIPO EXPLÍCITO AÑADIDO: (postData: Post)
      this.foroService.getPostById(noti.postId).pipe(take(1)).subscribe(async (postData: Post) => {
        if (postData) {
          await this.modalCtrl.dismiss();

          const modalPost = await this.modalCtrl.create({
            component: DetalleForoComponent,
            componentProps: {
              post: postData,
              currentUser: { uid: this.userId }
            }
          });
          await modalPost.present();
        }
      });
    }
  }

  cerrar() {
    this.modalCtrl.dismiss();
  }
}