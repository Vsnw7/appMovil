import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { DetalleNosotrosComponent } from './detalle-nosotros/detalle-nosotros.component';

@Component({
  standalone: true,
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule]
})
export class NosotrosPage implements OnInit {

  // DATOS ESTRUCTURADOS
  info = {
    empresa: "Umbra Nexus",
    juego: {
      titulo: "La Maldición de la Catedral",
      resumen: "Un viaje sobrenatural entre el Morelia colonial y el antiguo Guayangareo.",
      imagen: "assets/shapes.svg", // Cambia esto por una imagen real de tu juego
      historiaCompleta: "El juego se ambienta en la ciudad de Morelia, Michoacán, trasladando al jugador a un viaje entre dos tiempos: el Morelia colonial y el antiguo Guayangareo purépecha. La historia inicia cuando un joven moreliano es atraído por un cántico en la Catedral y, al descubrir un altar oculto, recibe una maldición que lo transporta al pasado. Allí deberá sobrevivir, explorar aldeas purépechas, enfrentarse a los Chichimecas oscuros y tomar decisiones que marcarán el destino del mundo."
    },
    app: {
      objetivo: "Hub central de experiencia para el jugador.",
      beneficios: [
        { 
          titulo: "Accesibilidad", 
          icono: "phone-portrait-outline", 
          desc: "Conectado sin necesidad de PC." 
        },
        { 
          titulo: "Comunidad", 
          icono: "people-circle-outline", 
          desc: "Foros e interacción activa." 
        },
        { 
          titulo: "Multimedia", 
          icono: "images-outline", 
          desc: "Galerías y videos exclusivos." 
        },
        { 
          titulo: "Al Día", 
          icono: "notifications-outline", 
          desc: "Noticias en tiempo real." 
        }
      ]
    }
  };

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  // ABRIR EL MODAL CON LA HISTORIA
  async verHistoria() {
    const modal = await this.modalCtrl.create({
      component: DetalleNosotrosComponent,
      componentProps: {
        titulo: this.info.juego.titulo,
        contenido: this.info.juego.historiaCompleta,
        imagen: this.info.juego.imagen
      }
    });
    await modal.present();
  }

}