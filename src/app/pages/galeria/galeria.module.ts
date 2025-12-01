import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { GaleriaPageRoutingModule } from './galeria-routing.module';
import { GaleriaPage } from './galeria.page';
import { SafeYoutubePipe } from '../../pipes/safe-youtube.pipe';

// 1. IMPORTAR EL COMPONENTE
import { DetalleGaleriaComponent } from './detalle-galeria/detalle-galeria.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GaleriaPageRoutingModule,
    SafeYoutubePipe
  ],
  declarations: [
    GaleriaPage,
    DetalleGaleriaComponent // 2. AGREGARLO AQUÍ
  ]
})
export class GaleriaPageModule {}