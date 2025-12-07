import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
// Módulo de rutas: define la URL para llegar a esta página
import { ForoPageRoutingModule } from './foro-routing.module';
// La página principal que controla la vista del foro
import { ForoPage } from './foro.page';
// Importamos DetalleForoComponent (el componente hijo)
import { DetalleForoComponent } from './detalle-foro/detalle-foro.component';

@NgModule({
  imports: [
    CommonModule,     // Directivas esenciales de Angular (ngIf, ngFor)
    FormsModule,      // Permite usar [(ngModel)] en los inputs
    IonicModule,      // Componentes visuales de Ionic (ion-content, ion-button, etc.)
    ForoPageRoutingModule, // Habilita la navegación hacia esta página
    DetalleForoComponent // <--- Va AQUÍ porque es Standalone
                         // NOTA: Al ser "Standalone: true", Angular lo trata como un módulo independiente.
                         // Si NO fuera standalone, tendría que ir abajo en 'declarations'.
  ],
  declarations: [
    ForoPage // Declaramos 'ForoPage' aquí porque pertenece exclusivamente a este módulo.
  ]
})
export class ForoPageModule {}