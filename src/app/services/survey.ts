import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private firestore =
    inject(Firestore);

  async createSurvey(data:any){

    const surveysCollection =
      collection(
        this.firestore,
        'encuestas'
      );

    return await addDoc(
      surveysCollection,
      {
        ...data,
        createdAt: serverTimestamp()
      }
    );

  }

}