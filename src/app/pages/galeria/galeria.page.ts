import { Component, OnInit } from '@angular/core';
import { GaleriaService } from '../../services/galeria.service';
import { GaleriaImagen, GaleriaVideo } from '../../interfaces/galeria.interface';

// 1. IMPORTACIONES
import { ModalController } from '@ionic/angular';
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
  ) {}

  ngOnInit() {
    this.galeriaService.getImagenes().subscribe(data => {
      this.imagenes = data;
    });

    this.galeriaService.getVideos().subscribe(data => {
      this.videos = data;
    });
  }

  // 3. ABRIR DETALLE DE IMAGEN
  async verImagen(item: GaleriaImagen) {
    const modal = await this.modalCtrl.create({
      component: DetalleGaleriaComponent,
      componentProps: {
        imagen: item // Pasamos solo la imagen
      }
    });
    await modal.present();
  }

  // 4. ABRIR DETALLE DE VIDEO
  async verVideo(item: GaleriaVideo) {
    const modal = await this.modalCtrl.create({
      component: DetalleGaleriaComponent,
      componentProps: {
        video: item // Pasamos solo el video
      }
    });
    await modal.present();
  }

}