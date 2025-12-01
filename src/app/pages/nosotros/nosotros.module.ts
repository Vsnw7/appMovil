import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NosotrosPageRoutingModule } from './nosotros-routing.module';
import { NosotrosPage } from './nosotros.page';

// 1. IMPORTAR
import { DetalleNosotrosComponent } from './detalle-nosotros/detalle-nosotros.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NosotrosPageRoutingModule,
    NosotrosPage 
  ],
  declarations: [
    DetalleNosotrosComponent // 2. DECLARAR AQUÍ (Importante: borrar si estaba en imports)
  ] 
})
export class NosotrosPageModule {}