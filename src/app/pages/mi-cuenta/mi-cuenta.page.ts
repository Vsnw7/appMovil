import { Component, OnInit } from '@angular/core';
import { Usuarios } from 'src/app/services/usuarios';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-mi-cuenta',
  templateUrl: './mi-cuenta.page.html',
  styleUrls: ['./mi-cuenta.page.scss'],
  standalone: false
})
export class MiCuentaPage implements OnInit {

  user: any = null;
  username: string = '';
  // Esta variable controla la imagen grande que se ve en pantalla.
  // Cambia dinámicamente si el usuario escribe o selecciona una predefinida.
  avatarSeleccionado: string = '';

  // Lista de avatares rápidos (URLs limpias)
  // Usada en el HTML con un *ngFor para mostrar la galería de opciones
  avataresPredefinidos: string[] = [
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Felix',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Aneka',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Zack',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Molly',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Garfield',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Sasha',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Cali',
    'https://api.dicebear.com/9.x/adventurer/svg?seed=Bandit'
  ];

  constructor(
    private usuarios: Usuarios,       // Servicio para leer/escribir datos del usuario
    private toastCtrl: ToastController // Servicio para mostrar alertas flotantes
  ) { }

  ngOnInit() {
    // Escuchamos el estado actual de la sesión
    this.usuarios.getAuth().subscribe(user => {
      this.user = user;
      if (user) {
        // Carga inicial:
        // Si ya tiene nombre, lo ponemos en el input.
        this.username = user.displayName || '';
        // Si ya tiene foto en Firebase, la usamos. Si no, ponemos la primera de la lista por defecto.
        this.avatarSeleccionado = user.photoURL || this.avataresPredefinidos[0];
      }
    });
  }

  // LOGICA DEL BUSCADOR: Genera un avatar basado en lo que escribes
  buscarAvatar(event: any) {
    const texto = event.detail.value;
    if (texto && texto.length > 0) {
      // Magia de DiceBear: La URL cambia según el 'seed' (semilla), generando una imagen única por cada palabra.
      // Esto actualiza la vista previa inmediatamente.
      this.avatarSeleccionado = `https://api.dicebear.com/9.x/adventurer/svg?seed=${texto}`;
    }
  }

  // Seleccionar de la lista de bolitas
  // Actualiza la variable principal cuando el usuario hace click en una opción rápida
  seleccionarAvatar(url: string) {
    this.avatarSeleccionado = url;
  }

  // Guardar en Firebase
  async guardarCambios() {
    // Validación básica de UX (Experiencia de Usuario)
    if (this.username.length < 3) {
      this.mostrarToast('El nombre de usuario es muy corto', 'warning');
      return;
    }

    try {
      // Llamada asíncrona al servicio: Esperamos a que Firebase confirme que guardó
      await this.usuarios.guardarPerfil(this.username, this.avatarSeleccionado);
      this.mostrarToast('¡Perfil actualizado con éxito!', 'success');
    } catch (error) {
      console.error('ERROR DETALLADO:', error); // <--- Útil para debugging
      this.mostrarToast('Error al guardar', 'danger');
    }
  }

  // Helper para reutilizar código de alertas
  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color,    // 'success' (verde), 'warning' (amarillo), 'danger' (rojo)
      position: 'bottom'
    });
    toast.present();
  }
}