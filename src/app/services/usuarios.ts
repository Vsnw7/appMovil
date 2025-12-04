import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Firestore, doc, setDoc } from '@angular/fire/firestore'; 
import firebase from 'firebase/compat/app';
import { Platform } from '@ionic/angular'; // <--- Importamos Platform

@Injectable({
  providedIn: 'root'
})
export class Usuarios {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: Firestore,
    private platform: Platform // <--- Inyectamos Platform
  ) { }

  // --- LOGIN CON EMAIL ---
  autenticar(email: string, pass: string) {
    return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  // --- LOGIN CON GOOGLE (MODIFICADO) ---
  async loginGoogle() {
    // Verificamos si la app corre en un dispositivo nativo (Android/iOS)
    if (this.platform.is('capacitor')) {
      // En celular usamos redirección para evitar bloqueos de seguridad
      return this.afAuth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
    } else {
      // En Web/PC usamos Popup que es más cómodo
      return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
    }
  }

  // --- REGISTRO ---
  registrar(email: string, pass: string) {
    return this.afAuth.createUserWithEmailAndPassword(email, pass);
  }

  getAuth() {
    return this.afAuth.authState;
  }

  logout() {
    return this.afAuth.signOut();
  }

  getCurrentUser() {
    return this.afAuth.currentUser;
  }

  // --- GUARDAR PERFIL (LÓGICA EXISTENTE) ---
  async guardarPerfil(nombre: string, urlFoto: string) {
    const user = await this.afAuth.currentUser;
    
    if (!user) {
      throw new Error('No hay usuario logueado');
    }

    try {
      // 1. Actualizar Auth (Visual)
      await user.updateProfile({
        displayName: nombre,
        photoURL: urlFoto
      });

      // 2. Guardar en Firestore
      const userDocRef = doc(this.firestore, 'users', user.uid);

      const datosUsuario = {
        uid: user.uid,
        displayName: nombre,
        photoURL: urlFoto,
        email: user.email,
        fechaActualizacion: new Date().toISOString()
      };

      return setDoc(userDocRef, datosUsuario, { merge: true });
      
    } catch (error) {
      console.error('ERROR AL GUARDAR PERFIL:', error);
      throw error;
    }
  }
}