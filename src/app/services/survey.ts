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

  // CREAR ENCUESTA (CLEAN + PRODUCTION READY)
  async createSurvey(data: any) {

    let game = null;

    try {
      const gameData: any = await firstValueFrom(
        this.getGameInfo(data.videojuego)
      );

      game = gameData?.results?.[0];

    } catch (error) {
      game = null;
    }

    const surveysCollection = collection(this.firestore, 'encuestas');

    const payload = {
      apodo: data.apodo,
      edad: data.edad,
      rol: data.rol,
      videojuego: data.videojuego,
      plataforma: data.plataforma,
      genero: data.genero,
      comentario: data.comentario,

      imagen: data.image || null,

      latitud: data.latitud,
      longitud: data.longitud,
      lugar: data.lugar,
      fecha: data.fecha,

      gameInfo: {
        name: game?.name || data.videojuego,
        image: game?.background_image || null,
        rating: game?.rating || null,
        genres: game?.genres || [],
        platforms: game?.platforms || []
      },

      createdAt: serverTimestamp()
    };

    return await addDoc(surveysCollection, payload);
  }

  // RAWG API
  getGameInfo(name: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/games?search=${name}&key=${this.apiKey}`
    );
  }

  // OBTENER ENCUESTAS
  getSurveys(): Observable<any[]> {
    const ref = collection(this.firestore, 'encuestas');

    return collectionData(ref, {
      idField: 'id'
    });
  }
}