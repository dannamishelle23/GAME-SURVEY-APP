import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RawgService {

  private apiKey = '7e5404871d8d40cdbc5c750dc6897eed';
  private baseUrl = 'https://api.rawg.io/api';

  constructor(private http: HttpClient) {}

  getGames(): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/games?key=${this.apiKey}`
    );
  }

  searchGames(query: string): Observable<any> {
    return this.http.get(
      `${this.baseUrl}/games?search=${query}&key=${this.apiKey}`
    );
  }
}