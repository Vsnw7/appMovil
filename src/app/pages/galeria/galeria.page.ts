import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../services/galeria.service';
import { GaleriaImagen, GaleriaVideo } from '../../interfaces/galeria.interface';

// 1. IMPORTACIONES
// ModalController: Servicio de Ionic necesario para crear y controlar ventanas emergentes (modales).
import { ModalController } from '@ionic/angular';
// Importamos la clase del componente que queremos mostrar DENTRO del modal.
import { DetalleGaleriaComponent } from './detalle-galeria/detalle-galeria.component';

@Component({
  standalone: false,
  selector: 'app-galeria',
  templateUrl: './galeria.page.html',
  styleUrls: ['./galeria.page.scss'],
})
export class GaleriaPage implements OnInit {

  imagenes: GaleriaImagen[] = [];
  videos: GaleriaVideo[] = [];

  constructor(
    private galeriaService: GaleriaService,
    private modalCtrl: ModalController // 2. INYECTAR
    // Inyectamos el controlador para tener acceso a métodos como .create() y .dismiss()
  ) {}

  ngOnInit() {
    // Carga inicial de datos desde el servicio
    this.galeriaService.getImagenes().subscribe(data => {
      this.imagenes = data;
    });

    this.galeriaService.getVideos().subscribe(data => {
      this.videos = data;
    });
  }

  // 3. ABRIR DETALLE DE IMAGEN
  async verImagen(item: GaleriaImagen) {
    // Usamos 'await' porque la creación del modal es asíncrona (toma un momento)
    const modal = await this.modalCtrl.create({
      component: DetalleGaleriaComponent, // Le decimos a Ionic qué componente renderizar
      componentProps: {
        imagen: item // ENVIAR DATOS: Pasamos el objeto 'item' al hijo mediante la prop 'imagen'
      }
    });
    await modal.present(); // Muestra el modal en la pantalla del usuario
  }

  // 4. ABRIR DETALLE DE VIDEO
  async verVideo(item: GaleriaVideo) {
    const modal = await this.modalCtrl.create({
      component: DetalleGaleriaComponent,
      componentProps: {
        video: item // ENVIAR DATOS: Aquí pasamos el video en una prop distinta ('video')
      }
    });
    await modal.present();
  }

}