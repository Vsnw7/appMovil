import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/services/usuarios';
import { Router } from '@angular/router';
import { AngularFireAuth } from '@angular/fire/compat/auth'; // <--- Importamos esto

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  email: string = '';
  password: string = '';
  errorMessage: string = '';

  constructor(
    private usuarios: Usuarios,
    private router: Router,
    private afAuth: AngularFireAuth // <--- Inyectamos para capturar el retorno de Google
  ) {}

  ngOnInit() {
    // 1. Si el usuario ya tenía sesión activa de antes
    this.usuarios.getAuth().subscribe(user => {
      if (user) {
        this.router.navigate(['/inicio']);
      }
    });

    // 2. IMPORTANTE: Capturar el resultado si venimos de una redirección de Google
    this.afAuth.getRedirectResult()
      .then(result => {
        if (result.user) {
          console.log('Usuario logueado vía redirección:', result.user);
          this.router.navigate(['/inicio']);
        }
      })
      .catch(error => {
        console.error('Error en redirección:', error);
        // Opcional: mostrar error amigable si cancelaron
        this.errorMessage = error.message;
      });
  }

  login() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Debes llenar todos los campos';
      return;
    }
    this.usuarios.autenticar(this.email, this.password)
      .then(() => {
        this.router.navigate(['/inicio']);
      })
      .catch((err) => {
        this.errorMessage = 'Credenciales incorrectas';
      });
  }

  loginGoogle() {
    this.usuarios.loginGoogle()
      .then(() => {
        // En PC entra aquí directo. En celular, se recarga la página y entra por ngOnInit.
        // Por si acaso, dejamos la redirección aquí también.
        this.router.navigate(['/inicio']);
      })
      .catch(err => {
        console.error(err);
        this.errorMessage = 'Error iniciando con Google';
      });
  }
}