import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Noticia } from 'src/app/interfaces/noticia.interface';

@Component({
  standalone: false,
  selector: 'app-detalle-noticia',
  templateUrl: './detalle-noticia.component.html',
  styleUrls: ['./detalle-noticia.component.scss']
})
export class DetalleNoticiaComponent implements OnInit {

  // @Input(): Marca esta propiedad como un punto de entrada de datos.
  // Es lo que recibe el objeto que pasaste en 'componentProps' desde la página anterior.
  // El signo '!': (Non-null assertion) Le dice a TypeScript: "Confía en mí,
  // esta variable NO será nula porque Ionic se encarga de llenarla al crear el modal".
  @Input() noticia!: Noticia; // Recibimos la noticia seleccionada

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  // Función vinculada al botón de "X" o "Cerrar"
  cerrarModal() {
    // .dismiss() destruye la instancia actual del modal y libera memoria
    this.modalController.dismiss();
  }
}