import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/services/usuarios';
import { Router } from '@angular/router';

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
    private router: Router
  ) {}

  ngOnInit() {
    // Opcional: Si el usuario ya está logueado, lo mandamos directo a inicio
    this.usuarios.getAuth().subscribe(user => {
      if (user) {
        this.router.navigate(['/inicio']);
      }
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
        // Firebase ya guarda la sesión, solo redirigimos
        this.router.navigate(['/inicio']);
      })
      .catch(err => {
        console.error(err);
        this.errorMessage = 'Error con Google Login';
      });
  }
}