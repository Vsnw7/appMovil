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
    private router: Router,
  ) {}

  ngOnInit() {
    // 1. Si el usuario ya tenía sesión activa de antes
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
}