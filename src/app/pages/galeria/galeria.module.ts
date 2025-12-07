import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

// Configuración de rutas específica para navegar a esta página
import { GaleriaPageRoutingModule } from './galeria-routing.module';
// La lógica de la página principal (controlador)
import { GaleriaPage } from './galeria.page';
// Utilidad para permitir videos (seguridad de Angular)
import { SafeYoutubePipe } from '../../pipes/safe-youtube.pipe';

// 1. IMPORTAR EL COMPONENTE
// Importamos la lógica del componente hijo para poder registrarlo abajo
import { DetalleGaleriaComponent } from './detalle-galeria/detalle-galeria.component';

@NgModule({
  imports: [
    CommonModule,     // Directivas básicas de Angular (ngIf, ngFor)
    FormsModule,      // Manejo de formularios (ngModel)
    IonicModule,      // Componentes visuales de Ionic (ion-content, ion-button)
    GaleriaPageRoutingModule, // Habilita la navegación hacia esta página
    SafeYoutubePipe   // Habilita el uso del pipe en el HTML (asumiendo que es Standalone)
  ],
  declarations: [
    GaleriaPage,      // Declara la página principal para que este módulo la "conozca"
    DetalleGaleriaComponent // 2. AGREGARLO AQUÍ
                            // Registra el componente hijo para usar su etiqueta <app-detalle-galeria> en el HTML
  ]
})
export class GaleriaPageModule {}