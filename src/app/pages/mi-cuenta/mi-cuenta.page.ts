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
  avatarSeleccionado: string = '';

  // Lista de avatares rápidos (URLs limpias)
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
    private usuarios: Usuarios,
    private toastCtrl: ToastController
  ) { }

  ngOnInit() {
    this.usuarios.getAuth().subscribe(user => {
      this.user = user;
      if (user) {
        this.username = user.displayName || '';
        // Si tiene foto la usamos, si no, usamos la primera por defecto
        this.avatarSeleccionado = user.photoURL || this.avataresPredefinidos[0];
      }
    });
  }

  // LOGICA DEL BUSCADOR: Genera un avatar basado en lo que escribes
  buscarAvatar(event: any) {
    const texto = event.detail.value;
    if (texto && texto.length > 0) {
      // Usamos el servicio gratuito de DiceBear
      this.avatarSeleccionado = `https://api.dicebear.com/9.x/adventurer/svg?seed=${texto}`;
    }
  }

  // Seleccionar de la lista de bolitas
  seleccionarAvatar(url: string) {
    this.avatarSeleccionado = url;
  }

  // Guardar en Firebase
async guardarCambios() {
    if (this.username.length < 3) {
      this.mostrarToast('El nombre de usuario es muy corto', 'warning');
      return;
    }

    try {
      await this.usuarios.guardarPerfil(this.username, this.avatarSeleccionado);
      this.mostrarToast('¡Perfil actualizado con éxito!', 'success');
    } catch (error) {
      console.error('ERROR DETALLADO:', error); // <--- Mira esto en la consola (F12)
      this.mostrarToast('Error al guardar', 'danger');
    }
}

  async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastCtrl.create({
      message: mensaje,
      duration: 2000,
      color: color,
      position: 'bottom'
    });
    toast.present();
  }
}