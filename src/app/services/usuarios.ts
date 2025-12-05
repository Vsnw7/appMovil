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

  // --- LOGIN CON EMAIL ---
  autenticar(email: string, pass: string) {
    return this.afAuth.signInWithEmailAndPassword(email, pass);
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

      console.log('Guardando en Firestore Modular:', datosUsuario);
      return setDoc(userDocRef, datosUsuario, { merge: true });
      
    } catch (error) {
      console.error('ERROR AL GUARDAR PERFIL:', error);
      throw error;
    }
  }
}