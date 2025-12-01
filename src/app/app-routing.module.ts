import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../../src/app/guards/auth-guard'; // Importa el Guard
const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Redirige a Login al abrir la app
    pathMatch: 'full'
  },
  {
    path: 'login',
    // Si ya está logueado, podrías hacer un "PublicGuard", pero por ahora dejémoslo así
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro', // Nueva ruta para registrarse
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  // --- Rutas Protegidas (Necesitan canActivate: [AuthGuard]) ---
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AuthGuard] 
  },
  {
    path: 'noticias',
    loadChildren: () => import('./pages/noticias/noticias.module').then( m => m.NoticiasPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'foro',
    loadChildren: () => import('./pages/foro/foro.module').then( m => m.ForoPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'galeria',
    loadChildren: () => import('./pages/galeria/galeria.module').then( m => m.GaleriaPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'nosotros',
    loadChildren: () => import('./pages/nosotros/nosotros.module').then( m => m.NosotrosPageModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'registro',
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  {
    path: 'mi-cuenta',
    loadChildren: () => import('./pages/mi-cuenta/mi-cuenta.module').then( m => m.MiCuentaPageModule)
  },
  // Eliminé la ruta duplicada de 'inicio' y la ruta 'home' que no querías.
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
