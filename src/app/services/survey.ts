import { Injectable, inject } from '@angular/core';

import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
  collectionData
} from '@angular/fire/firestore';

import { HttpClient } from '@angular/common/http';
import { Observable, firstValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private http = inject(HttpClient);
  private firestore = inject(Firestore);

  // RAWG CONFIG
  private apiKey = '7e5404871d8d40cdbc5c750dc6897eed';
  private baseUrl = 'https://api.rawg.io/api';

  // CREAR ENCUESTA
  async createSurvey(data: any) {

    try {
      const gameData: any = await firstValueFrom(
        this.getGameInfo(data.videojuego)
      );

      const game = gameData?.results?.[0];

      const surveysCollection = collection(this.firestore, 'encuestas');

      return await addDoc(surveysCollection, {
        ...data,

        // RAWG INFO
        gameInfo: {
          name: game?.name || data.videojuego,
          image: game?.background_image || null,
          rating: game?.rating || null,
          genres: game?.genres || [],
          platforms: game?.platforms || []
        },

        createdAt: serverTimestamp()
      });

    } catch (error) {

      // fallback si RAWG falla
      const surveysCollection = collection(this.firestore, 'encuestas');

      return await addDoc(surveysCollection, {
        ...data,

        gameInfo: {
          name: data.videojuego,
          image: null,
          rating: null,
          genres: [],
          platforms: []
        },

        createdAt: serverTimestamp()
      });
    }
  }

  // BUSCAR JUEGO
  getGameInfo(name: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/games?search=${name}&key=${this.apiKey}`
    );
  }

  // LEER ENCUESTAS
  getSurveys(): Observable<any[]> {
    const ref = collection(this.firestore, 'encuestas');

    return collectionData(ref, {
      idField: 'id'
    });
  }
}