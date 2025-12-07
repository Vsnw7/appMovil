import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: false, // Indica que este componente debe ser declarado en un Módulo (NgModule)
  selector: 'app-detalle-nosotros',
  templateUrl: './detalle-nosotros.component.html',
  styleUrls: ['./detalle-nosotros.component.scss'],
})
export class DetalleNosotrosComponent implements OnInit {

  // Recibimos el título y contenido para hacerlo dinámico
  // @Input() funciona como una "variable pública" o un puerto de entrada.
  // Permite que 'NosotrosPage' le pase los datos (titulo, historia, imagen) a este modal.
  @Input() titulo: string = '';
  @Input() contenido: string = '';
  @Input() imagen: string = '';

  // Inyectamos el ModalController para tener control sobre la ventana flotante
  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  // Función vinculada al botón de cerrar en el HTML
  cerrar() {
    // .dismiss() elimina el modal de la pantalla y regresa al usuario a la vista anterior
    this.modalCtrl.dismiss();
  }
}