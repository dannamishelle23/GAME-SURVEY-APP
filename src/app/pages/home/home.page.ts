import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { addIcons } from 'ionicons';
import { addCircleOutline, clipboardOutline, logOutOutline } from 'ionicons/icons';

// Importaciones de servicios
import { AuthService } from 'src/app/services/auth';
import { SurveyService } from 'src/app/services/survey';
import { RawgService } from 'src/app/services/rawg.service';

import {
  IonIcon,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton,
  IonText,
  IonButtons
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'], // Asegúrate de mantener tu ruta de estilos si la usas
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonText,
    IonButtons
  ],
})
export class HomePage implements OnInit, OnDestroy {

  encuestas: any[] = [];
  games: any[] = [];
  private sub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private surveyService: SurveyService,
    private rawgService: RawgService
  ) {
    addIcons({
      addCircleOutline,
      clipboardOutline,
      logOutOutline
    });
  }

  ngOnInit() {
    this.loadSurveys();
    this.loadGames();
  }

  loadSurveys() {
    this.sub = this.surveyService.getSurveys().subscribe(data => {
      this.encuestas = data;
    });
  }

  loadGames() {
    this.rawgService.getGames().subscribe(res => {
      this.games = res.results;
    });
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
  }

  async logout() {
    await this.authService.logout();
    this.router.navigate(['/login']);
  }
}