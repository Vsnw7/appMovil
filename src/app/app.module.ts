import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { firebaseConfig } from '../environments/firebaseconfig';

// --- IMPORTACIONES COMPAT (Versión antigua/clásica) ---
import { AngularFireModule } from '@angular/fire/compat';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
// VITAL: Este es el que te falta para que funcione 'Usuarios.ts'
import { AngularFirestoreModule } from '@angular/fire/compat/firestore'; 

// --- IMPORTACIONES MODULAR (Versión nueva) ---
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    
    // 1. Inicializar Firebase Compat (Para Auth, Storage y TU servicio de Usuarios)
    AngularFireModule.initializeApp(firebaseConfig),
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFirestoreModule, // <--- ¡ESTO ES LO QUE ARREGLA EL ERROR!

  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    
    // 2. Inicializar Firebase Modular (Para tus servicios de Inicio y Noticias)
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}