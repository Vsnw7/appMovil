import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { InicioPageRoutingModule } from './inicio-routing.module';
import { InicioPage } from './inicio.page';
// Importamos NotificacionesComponent
import { NotificacionesComponent } from '../../componentes/notificaciones/notificaciones.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    InicioPageRoutingModule,
    NotificacionesComponent // <--- Va AQUÍ porque es Standalone
  ],
  declarations: [InicioPage]
})
export class InicioPageModule {}