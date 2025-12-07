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
  standalone: true, // Componente autónomo: Define sus propios imports aquí
  imports: [IonicModule, CommonModule]
})
export class NotificacionesComponent implements OnInit {

  // Recibimos el ID del usuario actual desde la página padre (InicioPage)
  @Input() userId!: string;
  listaNotificaciones: Notificacion[] = [];

  constructor(
    private modalCtrl: ModalController,
    private foroService: ForoService
  ) { }

  ngOnInit() {
    if (this.userId) {
      // TIPO EXPLÍCITO AÑADIDO: (data: Notificacion[])
      // Suscripción en tiempo real: Si llega una notificación nueva, la lista se actualiza sola.
      this.foroService.getNotificaciones(this.userId).subscribe((data: Notificacion[]) => {
        this.listaNotificaciones = data;
      });
    }
  }

  // Lógica al hacer click en una notificación
  async revisarNotificacion(noti: Notificacion) {
    // 1. Marcar como leída en Firebase (el puntito rojo desaparece y el contador baja)
    if (!noti.leido && noti.id) {
      this.foroService.marcarLeida(this.userId, noti.id);
    }

    if (noti.postId) {
      // 2. Buscar el post original relacionado.
      // Usamos 'take(1)' para obtener el dato UNA sola vez y cerrar el flujo (ahorra memoria).
      // TIPO EXPLÍCITO AÑADIDO: (postData: Post)
      this.foroService.getPostById(noti.postId).pipe(take(1)).subscribe(async (postData: Post) => {
        if (postData) {
          // 3. UX (Experiencia de Usuario): Transición de modales
          // Primero cerramos ESTE modal (la lista de notificaciones)...
          await this.modalCtrl.dismiss();

          // ...y abrimos inmediatamente el modal del DETALLE del post.
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