import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Observable } from 'rxjs';
// Servicios para obtener datos, autenticación y lógica del foro
import { InicioService } from '../../services/inicio.service';
import { Usuarios } from 'src/app/services/usuarios';
import { ForoService } from '../../services/foro'; 
// El componente visual de notificaciones que abriremos como Modal
import { NotificacionesComponent } from 'src/app/componentes/notificaciones/notificaciones.component';
import { HeroContent, HistoriaContent } from '../../interfaces/inicio.interface';

@Component({
  standalone: false,
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss']
})
export class InicioPage implements OnInit {

  // Observables: Son flujos de datos asíncronos. Se suele usar el símbolo '$' al final por convención.
  // Estos se conectan directamente al HTML con el pipe `| async`.
  hero$: Observable<HeroContent[]>;
  historia$: Observable<HistoriaContent[]>;
  
  // Variables de estado local para manejar la UI de notificaciones
  userId: string | null = null;
  countSinLeer: number = 0; // Controla el número que aparece en el "badge" (globito rojo)

  constructor(
    private inicioService: InicioService,
    private usuarios: Usuarios,
    private foroService: ForoService, // Inyectamos servicio para acceder a la BD de notificaciones
    private modalCtrl: ModalController
  ) {
    // Iniciamos la carga de contenido visual apenas se crea el componente
    this.hero$ = this.inicioService.getHeroContent();
    this.historia$ = this.inicioService.getHistoriaContent();
  }

  ngOnInit() {
    // 1. Escuchamos el estado de autenticación
    this.usuarios.getAuth().subscribe(user => {
      if (user) {
        this.userId = user.uid;
        
        // 2. Suscripción en TIEMPO REAL a las notificaciones del usuario
        // Cada vez que llegue una notificación nueva a Firebase, esto se ejecuta de nuevo.
        this.foroService.getNotificaciones(user.uid).subscribe(notis => {
          
          // 3. Lógica de filtrado:
          // Contamos cuántas notificaciones tienen la propiedad 'leido' en false
          this.countSinLeer = notis.filter(n => !n.leido).length;
        });
      }
    });
  }

  // Abre la ventana modal con la lista de notificaciones
  async abrirNotificaciones() {
    if (!this.userId) return; // Validación de seguridad
    
    const modal = await this.modalCtrl.create({
      component: NotificacionesComponent, // El componente a renderizar
      componentProps: { userId: this.userId } // Pasamos el ID al componente hijo para que sepa qué cargar
    });
    await modal.present();
  }
}