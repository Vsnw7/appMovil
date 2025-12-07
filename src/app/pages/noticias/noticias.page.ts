import { Component, OnInit } from '@angular/core';
import { NoticiasService } from '../../services/noticias.service';
import { Noticia } from '../../interfaces/noticia.interface';

// 1. IMPORTACIONES NECESARIAS
// Importamos la herramienta de Ionic para gestionar ventanas flotantes (Modales)
import { ModalController } from '@ionic/angular';
// Importamos el componente hijo que servirá de vista para el detalle
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
    // Inyectamos el servicio que nos permite crear y manipular los modales
  ) {}

  ngOnInit() {
    // Conectamos con la base de datos para llenar la lista al iniciar
    this.noticiasService.getNoticias().subscribe(data => {
      this.noticias = data;
    });
  }

  // 3. FUNCIÓN PARA ABRIR EL MODAL
  // Usamos async/await para esperar a que el modal se construya antes de mostrarlo
  async verDetalle(noticiaSeleccionada: Noticia) {
    const modal = await this.modalCtrl.create({
      component: DetalleNoticiaComponent, // Indicamos QUÉ componente mostrar
      componentProps: {
        // PUENTE DE DATOS:
        // Aquí pasamos la información desde esta página (Padre) hacia el modal (Hijo).
        // La clave 'noticia' debe coincidir con el @Input() del componente hijo.
        noticia: noticiaSeleccionada 
      }
    });
    
    await modal.present(); // Hace visible el modal al usuario
  }

}