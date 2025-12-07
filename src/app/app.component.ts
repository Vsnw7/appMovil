import { Component, OnInit } from '@angular/core'; // Agrega OnInit
import { Router } from '@angular/router';
import { Usuarios } from './services/usuarios';
import { MenuController } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
// Implementa OnInit: Necesario para ejecutar lógica apenas arranca la aplicación
export class AppComponent implements OnInit {
  
  // Esta variable se usa en el HTML (app.component.html) para mostrar
  // la foto y el nombre en el Menú Lateral si hay sesión iniciada.
  user: any = null; 

  constructor(
    private usuarios: Usuarios,      // Servicio de Autenticación
    private router: Router,          // Para navegar entre páginas
    private menuCtrl: MenuController // Controlador para abrir/cerrar el menú lateral programáticamente
  ) {}

  // Suscribirse al usuario al iniciar la app
  ngOnInit() {
    // OBSERVER GLOBAL:
    // Se suscribe al estado de autenticación desde la raíz.
    // Esto asegura que el menú lateral siempre sepa si el usuario está logueado o no,
    // actualizando la variable 'this.user' automáticamente.
    this.usuarios.getAuth().subscribe(userData => {
      this.user = userData;
    });
  }

  logout() {
    this.usuarios.logout().then(() => {
      // 1. UX: Cerramos el menú lateral para que no se quede abierto al cambiar de página
      this.menuCtrl.close();
      
      // 2. Seguridad: Redirigimos al Login.
      // { replaceUrl: true } borra el historial, evitando que el usuario pueda volver
      // a la sesión cerrada presionando el botón "Atrás" del celular.
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }
}