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
    private alertController: AlertController // Inyectamos el controlador para dar feedback visual (popups)
  ) { }

  async registrar() {
    // Validación local: Evitamos hacer peticiones al servidor si los datos están incompletos
    if (!this.email || !this.password) {
      this.mostrarAlerta('Error', 'Por favor llena todos los campos.');
      return;
    }

    // Validación de seguridad: Firebase rechazará contraseñas cortas, así que avisamos antes
    if (this.password.length < 6) {
      this.mostrarAlerta('Contraseña débil', 'La contraseña debe tener al menos 6 caracteres.');
      return;
    }

    // Llamada al servicio de registro
    this.usuarios.registrar(this.email, this.password)
      .then((res) => {
        console.log('Usuario creado exitosamente', res);
        // ÉXITO: Firebase loguea automáticamente al crear la cuenta.
        // { replaceUrl: true } es CRUCIAL: Borra el historial de navegación.
        // Así, si el usuario presiona "Atrás" en su celular, la app se cierra en lugar de volver al registro.
        this.router.navigate(['/inicio'], { replaceUrl: true });
      })
      .catch(async (err) => {
        console.error(err);
        
        // TRADUCCIÓN DE ERRORES:
        // Firebase devuelve códigos técnicos (ej: 'auth/email-already-in-use').
        // Aquí los interceptamos para mostrar mensajes amigables en español.
        let mensaje = 'No se pudo crear la cuenta.';
        if (err.code === 'auth/email-already-in-use') {
          mensaje = 'Este correo ya está registrado. Por favor inicia sesión.';
        } else if (err.code === 'auth/invalid-email') {
          mensaje = 'El formato del correo no es válido.';
        }

        this.mostrarAlerta('Error de Registro', mensaje);
      });
  }

  // Función auxiliar (Helper) para no repetir el código de crear alertas en cada error
  async mostrarAlerta(header: string, message: string) {
    const alert = await this.alertController.create({
      header,
      message,
      buttons: ['OK']
    });
    await alert.present();
  }
}