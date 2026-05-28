import { Component } from '@angular/core';

import { Router, RouterLink } from '@angular/router';

import {
  IonIcon,
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton
} from '@ionic/angular/standalone';

import {
  AuthService
} from 'src/app/services/auth';

import { addIcons } from 'ionicons';
import { addCircleOutline, clipboardOutline, logOutOutline } from 'ionicons/icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,

  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton,
    IonIcon,
    RouterLink
  ],
})
export class HomePage {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    addIcons({
      addCircleOutline,
      clipboardOutline,
      logOutOutline
    })
  }

  async logout(){

    await this.authService.logout();

    this.router.navigate(['/login']);

  }

}