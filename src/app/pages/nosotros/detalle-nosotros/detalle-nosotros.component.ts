import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  standalone: false,
  selector: 'app-detalle-nosotros',
  templateUrl: './detalle-nosotros.component.html',
  styleUrls: ['./detalle-nosotros.component.scss'],
})
export class DetalleNosotrosComponent implements OnInit {

  // Recibimos el título y contenido para hacerlo dinámico
  @Input() titulo: string = '';
  @Input() contenido: string = '';
  @Input() imagen: string = '';

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  cerrar() {
    this.modalCtrl.dismiss();
  }
}