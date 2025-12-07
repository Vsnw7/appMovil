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
  // @Input() marca estas variables como "puertas de entrada".
  // Permiten que el padre (GaleriaPage) le pase los datos a este componente hijo.
  // Se inicializan en null por si acaso no se pasa alguno de los dos.
  @Input() imagen: GaleriaImagen | null = null;
  @Input() video: GaleriaVideo | null = null;

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  // Función vinculada al botón de "Cerrar" o "X" en el HTML
  cerrarModal() {
    // .dismiss() destruye el modal actual y regresa a la pantalla anterior
    this.modalController.dismiss();
  }
}