import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore'; 
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class Usuarios {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: Firestore,
  ) { }

  // Inicia sesión con email y contraseña usando Firebase Auth.
  autenticar(email: string, pass: string) {
    return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  // Registra un nuevo usuario con email y contraseña.
  registrar(email: string, pass: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }
// Retorna un observable con el estado de autenticación (usuario logueado o null).
  getAuth() {
    return this.afAuth.authState;
  }
// Cierra la sesión del usuario actual.
  logout() {
    return this.afAuth.signOut();
  }
// Obtiene el usuario actualmente autenticado (promesa).
  getCurrentUser() {
    return this.afAuth.currentUser;
  }

 // Actualiza el perfil del usuario logueado y guarda los datos en Firestore.
// Actualiza nombre y foto en Auth y luego los almacena en la colección 'users'.
  async guardarPerfil(nombre: string, urlFoto: string) {
    const user = await this.afAuth.currentUser;
    
    if (!user) {
      throw new Error('No hay usuario logueado');
    }

    try {
      // 1. Actualiza la información visual del usuario en Firebase Auth.
      await user.updateProfile({
        displayName: nombre,
        photoURL: urlFoto
      });

      // 2. Guarda los datos del usuario en Firestore con merge para no reemplazar todo.
      const userDocRef = doc(this.firestore, 'users', user.uid);

      const datosUsuario = {
        uid: user.uid,
        displayName: nombre,
        photoURL: urlFoto,
        email: user.email,
        fechaActualizacion: new Date().toISOString()
      };

      console.log('Guardando en Firestore Modular:', datosUsuario);
      return setDoc(userDocRef, datosUsuario, { merge: true });
      
    } catch (error) {
      console.error('ERROR AL GUARDAR PERFIL:', error);
      throw error;
    }
  }
}