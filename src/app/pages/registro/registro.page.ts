import { Component } from '@angular/core';
import { Usuarios } from 'src/app/services/usuarios';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular'; // Importamos AlertController

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage {

  email: string = '';
  password: string = '';

  constructor(
    private usuarios: Usuarios,
    private router: Router,
    private alertController: AlertController // Inyectamos el controlador de alertas
  ) { }

  async registrar() {
    // Validación básica
    if (!this.email || !this.password) {
      this.mostrarAlerta('Error', 'Por favor llena todos los campos.');
      return;
    }

    // Validación de longitud de contraseña (Firebase pide mínimo 6)
    if (this.password.length < 6) {
      this.mostrarAlerta('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    this.usuarios.registrar(this.email, this.password)
      .then((res) => {
        console.log('Usuario creado exitosamente', res);
        // Firebase loguea automáticamente, así que vamos directo a inicio
        // 'replaceUrl: true' borra el historial para que no puedan volver al registro
        this.router.navigate(['/inicio'], { replaceUrl: true });
      })
      .catch(async (err) => {
        console.error(err);
        
        // Manejo de errores específicos de Firebase
        let mensaje = 'No se pudo crear la cuenta.';
        if (err.code === 'auth/email-already-in-use') {
          mensaje = 'Este correo ya está registrado. Por favor inicia sesión.';
        } else if (err.code === 'auth/invalid-email') {
          mensaje = 'El formato del correo no es válido.';
        }

        this.mostrarAlerta('Error de Registro', mensaje);
      });
  }

  // Función auxiliar para mostrar alertas
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}