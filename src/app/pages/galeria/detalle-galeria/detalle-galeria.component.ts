import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { GaleriaImagen, GaleriaVideo } from 'src/app/interfaces/galeria.interface';

@Component({
  standalone: false,
  selector: 'app-detalle-galeria',
  templateUrl: './detalle-galeria.component.html',
  styleUrls: ['./detalle-galeria.component.scss'],
})
export class DetalleGaleriaComponent implements OnInit {

  // Aceptamos uno u otro
  @Input() imagen: GaleriaImagen | null = null;
  @Input() video: GaleriaVideo | null = null;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }
}