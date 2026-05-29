import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

import {
  IonIcon,
  IonContent,
  IonHeader,
  IonToolbar,
  IonList,
  IonTitle,
  IonButton,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonText,
  IonCardSubtitle,
  IonCardContent
} from '@ionic/angular/standalone';

import { CommonModule } from '@angular/common';

import { AuthService } from 'src/app/services/auth';
import { SurveyService } from 'src/app/services/survey';

import { Subscription } from 'rxjs';

import { addIcons } from 'ionicons';
import { addCircleOutline, clipboardOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,
  imports: [
    CommonModule,
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    IonList,
    IonText,
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent
  ],
})
export class HomePage implements OnInit, OnDestroy {

  encuestas: any[] = [];
  private sub!: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private surveyService: SurveyService
  ) {
    addIcons({
      addCircleOutline,
      clipboardOutline,
      logOutOutline
    });
  }

  ngOnInit() {
    this.loadSurveys();
  }

  loadSurveys() {
    this.sub = this.surveyService.getSurveys().subscribe(data => {
      this.encuestas = data;
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