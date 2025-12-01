import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { NoticiasPageRoutingModule } from './noticias-routing.module';
import { NoticiasPage } from './noticias.page';

// 1. IMPORTAR EL COMPONENTE NUEVO
import { DetalleNoticiaComponent } from './detalle-noticia/detalle-noticia.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    NoticiasPageRoutingModule,
  ],
  declarations: [
    NoticiasPage, 
    DetalleNoticiaComponent // 2. AGREGARLO AQUÍ
  ] 
})
export class NoticiasPageModule {}