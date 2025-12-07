import { Component, OnInit } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
// Importamos directamente el componente que usaremos en el modal
import { DetalleNosotrosComponent } from './detalle-nosotros/detalle-nosotros.component';

@Component({
  standalone: true, // <--- OJO: Componente Autónomo (Moderno)
  selector: 'app-nosotros',
  templateUrl: './nosotros.page.html',
  styleUrls: ['./nosotros.page.scss'],
  imports: [IonicModule, CommonModule, FormsModule] // Al ser standalone, sus importaciones van aquí directo, no en un module.ts
})
export class NosotrosPage implements OnInit {

  // DATOS ESTRUCTURADOS
  // Objeto JSON local que alimenta la vista. 
  // Centraliza los textos aquí para no ensuciar el HTML y facilitar cambios futuros.
  info = {
    empresa: "Umbra Nexus ©",
    juego: {
      titulo: "La Maldición de la Catedral",
      resumen: "Un viaje sobrenatural entre el Morelia colonial y el antiguo Guayangareo.",
      imagen: "assets/img/logo-game.png", 
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
        // Enviamos al modal solo los datos necesarios (titulo, texto largo e imagen)
        // para reutilizar el componente de detalle de forma genérica.
        titulo: this.info.juego.titulo,
        contenido: this.info.juego.historiaCompleta,
        imagen: this.info.juego.imagen
      }
    });
    await modal.present();
  }

  abrirWeb() {
    // '_system' es CRUCIAL en móviles:
    // Obliga a que el enlace se abra en el navegador nativo (Chrome/Safari)
    // y no dentro de la app (WebView), lo cual da mejor experiencia al usuario.
    window.open('https://umbranexus.pythonanywhere.com/', '_system'); 
  }

}