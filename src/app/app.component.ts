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
// Implementa OnInit
export class AppComponent implements OnInit {
  
  user: any = null; // Variable para guardar datos del usuario en el menú

  constructor(
    private usuarios: Usuarios,
    private router: Router,
    private menuCtrl: MenuController
  ) {}

  // Suscribirse al usuario al iniciar la app
  ngOnInit() {
    this.usuarios.getAuth().subscribe(userData => {
      this.user = userData;
    });
  }

  logout() {
    this.usuarios.logout().then(() => {
      this.menuCtrl.close();
      this.router.navigate(['/login'], { replaceUrl: true });
    });
  }
}