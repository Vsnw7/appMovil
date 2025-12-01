import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
// CAMBIO 1: Importamos las herramientas de la versión MODULAR (la que sí funciona en tu app)
import { Firestore, doc, setDoc } from '@angular/fire/firestore'; 
import firebase from 'firebase/compat/app';

@Injectable({
  providedIn: 'root'
})
export class Usuarios {

  constructor(
    private afAuth: AngularFireAuth,
    private firestore: Firestore // CAMBIO 2: Inyectamos 'Firestore' moderno en lugar de AngularFirestore
  ) { }

  // --- MÉTODOS DE LOGIN (Se quedan igual con Compat para no romper el Login) ---
  autenticar(email: string, pass: string) {
    return this.afAuth.signInWithEmailAndPassword(email, pass);
  }

  loginGoogle() {
    return this.afAuth.signInWithPopup(new firebase.auth.GoogleAuthProvider());
  }

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

  // --- ACTUALIZAR PERFIL (ACTUALIZADO A MODULAR) ---
  async guardarPerfil(nombre: string, urlFoto: string) {
    const user = await this.afAuth.currentUser;
    
    if (!user) {
      throw new Error('No hay usuario logueado');
    }

    try {
      // 1. Actualizar Auth (Visual - Nombre y foto en el menú)
      await user.updateProfile({
        displayName: nombre,
        photoURL: urlFoto
      });

      // 2. Guardar en Base de Datos (Usando versión Modular)
      // Referencia al documento: colección 'users', id del usuario
      const userDocRef = doc(this.firestore, 'users', user.uid);

      const datosUsuario = {
        uid: user.uid,
        displayName: nombre,
        photoURL: urlFoto,
        email: user.email,
        fechaActualizacion: new Date().toISOString() // Usamos ISOString para evitar errores de formato
      };

      console.log('Guardando en Firestore Modular:', datosUsuario);

      // setDoc con { merge: true } actualiza sin borrar lo que ya exista
      return setDoc(userDocRef, datosUsuario, { merge: true });
      
    } catch (error) {
      console.error('ERROR AL GUARDAR PERFIL:', error);
      throw error;
    }
  }
}