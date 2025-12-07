import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
// Importamos la "Barrera de seguridad" (Guard) que protegerá las rutas privadas
import { AuthGuard } from '../../src/app/guards/auth-guard'; 

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login', // Si la URL está vacía, redirige automáticamente al Login
    pathMatch: 'full'
  },
  {
    path: 'login',
    // Lazy Loading: Carga el código de la página SOLO cuando el usuario entra en ella.
    // Esto hace que la aplicación arranque más rápido.
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registro', 
    loadChildren: () => import('./pages/registro/registro.module').then( m => m.RegistroPageModule)
  },
  
  // --- Rutas Protegidas (Necesitan canActivate: [AuthGuard]) ---
  // A estas páginas SOLO se puede entrar si el AuthGuard dice "true" (usuario logueado)
  {
    path: 'inicio',
    loadChildren: () => import('./pages/inicio/inicio.module').then( m => m.InicioPageModule),
    canActivate: [AuthGuard] // <--- Aquí activamos la protección
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
    // NOTA: Generalmente 'mi-cuenta' también debería llevar 'canActivate: [AuthGuard]' 
    // para que nadie entre a editar perfil sin estar logueado.
  },
  // Eliminé la ruta duplicada de 'inicio' y la ruta 'home' que no querías.
];

@NgModule({
  imports: [
    // PreloadAllModules: Una vez que carga la primera página, Angular empieza a descargar 
    // las demás en "segundo plano" (background) para que cuando hagas clic, la navegación sea instantánea.
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }