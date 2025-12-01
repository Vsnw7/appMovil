import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ForoPage } from './foro.page';

const routes: Routes = [
  {
    path: '',
    component: ForoPage
  }
  // BORRAMOS la ruta extra 'detalle-foro' porque ahora es un Modal
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ForoPageRoutingModule {}