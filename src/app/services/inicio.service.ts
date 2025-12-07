import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HeroContent, HistoriaContent } from '../interfaces/inicio.interface';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private firestore: Firestore) {}

// Obtiene todos los documentos de la colección 'inicio-hero'.
// Retorna un Observable con un arreglo de HeroContent. 
  getHeroContent(): Observable<HeroContent[]> {
    const heroCollection = collection(this.firestore, 'inicio-hero');
    return collectionData(heroCollection, { idField: 'id' }) as Observable<HeroContent[]>;
  }

 // Obtiene todos los documentos de la colección 'inicio-historia'.
// Retorna un Observable con un arreglo de HistoriaContent.
  getHistoriaContent(): Observable<HistoriaContent[]> {
    const historiaCollection = collection(this.firestore, 'inicio-historia');
    return collectionData(historiaCollection, { idField: 'id' }) as Observable<HistoriaContent[]>;
  }

 // Obtiene un documento específico de la colección 'inicio-hero' usando su ID.
// Retorna un Observable con un solo objeto HeroContent.
  getHeroById(id: string): Observable<HeroContent> {
    const heroDoc = doc(this.firestore, `inicio-hero/${id}`);
    return docData(heroDoc, { idField: 'id' }) as Observable<HeroContent>;
  }
}
