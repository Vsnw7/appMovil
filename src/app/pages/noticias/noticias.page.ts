import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../interfaces/noticia.interface';

// 1. IMPORTACIONES NECESARIAS
import { ModalController } from '@ionic/angular';
import { DetalleNoticiaComponent } from './detalle-noticia/detalle-noticia.component';

@Component({
  standalone: false,
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})
export class NoticiasPage implements OnInit {

  noticias: Noticia[] = [];

  constructor(
    private noticiasService: NoticiasService,
    private modalCtrl: ModalController // 2. INYECTAR MODAL CONTROLLER
  ) {}

  ngOnInit() {
    this.noticiasService.getNoticias().subscribe(data => {
      this.noticias = data;
    });
  }

  // 3. FUNCIÓN PARA ABRIR EL MODAL
  async verDetalle(noticiaSeleccionada: Noticia) {
    const modal = await this.modalCtrl.create({
      component: DetalleNoticiaComponent,
      componentProps: {
        noticia: noticiaSeleccionada // Pasamos la noticia al componente hijo
      }
    });
    
    await modal.present();
  }

}