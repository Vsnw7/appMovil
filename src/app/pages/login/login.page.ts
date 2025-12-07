import { Component, OnInit } from '@angular/core';
// Importamos el servicio que maneja la lógica real de Firebase Auth
import { Usuarios } from 'src/app/services/usuarios';
// Router es necesario para cambiar de página (navegar) vía código
import { Router } from '@angular/router';

@Component({
  standalone: false,
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  // Variables vinculadas al HTML con [(ngModel)] para capturar lo que escribe el usuario
  email: string = '';
  password: string = '';
  // Variable para mostrar mensajes de error en la pantalla (ej: "Contraseña incorrecta")
  errorMessage: string = '';

  constructor(
    private usuarios: Usuarios, // Inyección del servicio de usuarios
    private router: Router,     // Inyección del router
  ) {}

  ngOnInit() {
    // 1. Si el usuario ya tenía sesión activa de antes (Persistencia)
    // Nos suscribimos al estado de autenticación. Si Firebase detecta que el usuario
    // ya inició sesión anteriormente y no cerró, lo redirigimos automáticamente.
    this.usuarios.getAuth().subscribe(user => {
      if (user) {
        this.router.navigate(['/inicio']);
      }
    });
  }

  // Función que se ejecuta al presionar el botón de "Ingresar"
  login() {
    // Validación local: Verificamos que no envíen campos vacíos
    if (!this.email || !this.password) {
      this.errorMessage = 'Debes llenar todos los campos';
      return;
    }

    // Llamamos al método del servicio que conecta con Firebase
    this.usuarios.autenticar(this.email, this.password)
      .then(() => {
        // THEN: Si la promesa se resuelve (login exitoso), navegamos al inicio
        this.router.navigate(['/inicio']);
      })
      .catch((err) => {
        // CATCH: Si la promesa falla (error de credenciales), mostramos el error
        // Aquí podrías usar 'err.message' para ser más específico, pero un mensaje genérico es más seguro
        this.errorMessage = 'Credenciales incorrectas';
      });
  }
}