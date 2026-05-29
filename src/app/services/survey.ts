import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  collectionData
} from '@angular/fire/firestore';

import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private firestore = inject(Firestore);

  // CREAR ENCUESTA
  async createSurvey(data: any) {
    const ref = collection(this.firestore, 'encuestas');

    return await addDoc(ref, {
      ...data,
      createdAt: serverTimestamp()
    });
  }

  // LEER ENCUESTAS
  getSurveys(): Observable<any[]> {
    const ref = collection(this.firestore, 'encuestas');

    return collectionData(ref, {
      idField: 'id'
    });
  }
}