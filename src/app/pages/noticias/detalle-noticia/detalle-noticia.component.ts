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

  @Input() noticia!: Noticia; // Recibimos la noticia seleccionada

  constructor(private modalController: ModalController) { }

  ngOnInit() {}

  cerrarModal() {
    this.modalController.dismiss();
  }
}