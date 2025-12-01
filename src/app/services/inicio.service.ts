import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, docData } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { HeroContent, HistoriaContent } from '../interfaces/inicio.interface';

@Injectable({
  providedIn: 'root'
})
export class InicioService {

  constructor(private firestore: Firestore) {}

  // Colección de Hero
  getHeroContent(): Observable<HeroContent[]> {
    const heroCollection = collection(this.firestore, 'inicio-hero');
    return collectionData(heroCollection, { idField: 'id' }) as Observable<HeroContent[]>;
  }

  // Colección de Historia
  getHistoriaContent(): Observable<HistoriaContent[]> {
    const historiaCollection = collection(this.firestore, 'inicio-historia');
    return collectionData(historiaCollection, { idField: 'id' }) as Observable<HistoriaContent[]>;
  }

  // Traer un documento específico (opcional)
  getHeroById(id: string): Observable<HeroContent> {
    const heroDoc = doc(this.firestore, `inicio-hero/${id}`);
    return docData(heroDoc, { idField: 'id' }) as Observable<HeroContent>;
  }
}
