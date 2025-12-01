import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [], // Se deja vacío
  imports: [
    CommonModule,
    IonicModule,
    HeaderComponent // IMPORTANTE: Los componentes standalone se ponen AQUÍ (imports), no en declarations
  ],
  exports: [
    HeaderComponent // Se sigue exportando igual
  ]
})
export class ComponentsModule { }