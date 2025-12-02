import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
import { InicioService } from '../../services/inicio.service';
import { Usuarios } from 'src/app/services/usuarios';
import { ForoService } from '../../services/foro'; 
import { NotificacionesComponent } from 'src/app/componentes/notificaciones/notificaciones.component';
import { HeroContent, HistoriaContent } from '../../interfaces/inicio.interface';

@Component({
  standalone: false,
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss']
})
export class InicioPage implements OnInit {

  hero$: Observable<HeroContent[]>;
  historia$: Observable<HistoriaContent[]>;
  
  // Variables para notificaciones
  userId: string | null = null;
  countSinLeer: number = 0;

  constructor(
    private inicioService: InicioService,
    private usuarios: Usuarios,
    private foroService: ForoService, // Inyectar
    private modalCtrl: ModalController
  ) {
    this.hero$ = this.inicioService.getHeroContent();
    this.historia$ = this.inicioService.getHistoriaContent();
  }

  ngOnInit() {
    this.usuarios.getAuth().subscribe(user => {
      if (user) {
        this.userId = user.uid;
        // Suscribirse en tiempo real a las notificaciones
        this.foroService.getNotificaciones(user.uid).subscribe(notis => {
          // Filtrar cuántas tienen leido == false
          this.countSinLeer = notis.filter(n => !n.leido).length;
        });
      }
    });
  }

  async abrirNotificaciones() {
    if (!this.userId) return;
    const modal = await this.modalCtrl.create({
      component: NotificacionesComponent,
      componentProps: { userId: this.userId }
    });
    await modal.present();
  }
}