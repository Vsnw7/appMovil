import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { ForoPageRoutingModule } from './foro-routing.module';
import { ForoPage } from './foro.page';
// Importamos DetalleForoComponent
import { DetalleForoComponent } from './detalle-foro/detalle-foro.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ForoPageRoutingModule,
    DetalleForoComponent // <--- Va AQUÍ porque es Standalone
  ],
  declarations: [ForoPage]
})
export class ForoPageModule {}