import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
// Importamos la autenticación de Firebase (versión compatibilidad)
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { map, take } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
// Implementamos 'CanActivate': La interfaz de Angular que decide si una ruta se activa o no.
export class AuthGuard implements CanActivate {

  constructor(private afAuth: AngularFireAuth, private router: Router) {}

  // Este método lo ejecuta el Router AUTOMÁTICAMENTE antes de cargar una página protegida.
  // Debe devolver un booleano: true (Pasa) o false (Bloqueado).
  canActivate(): Observable<boolean> {
    return this.afAuth.authState.pipe(
      take(1), // CRUCIAL: El router necesita una respuesta finita. 
               // 'take(1)' mira el estado una sola vez y cierra la conexión.
               // Sin esto, la aplicación podría quedarse "cargando" infinitamente esperando cambios.
      map(user => {
        if (user) {
          return true; // Hay un usuario logueado -> ACCESO CONCEDIDO
        } else {
          console.log('Acceso denegado: Usuario no logueado');
          this.router.navigate(['/login']); // No hay usuario -> PATEAR AL LOGIN
          return false; // ACCESO DENEGADO
        }
      })
    );
  }
}