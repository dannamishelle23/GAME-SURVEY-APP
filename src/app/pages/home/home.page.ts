import { Component } from '@angular/core';

import {
  Router
} from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonButton
} from '@ionic/angular/standalone';

import {
  AuthService
} from 'src/app/services/auth';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  standalone: true,

  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonButton
  ],
})
export class HomePage {

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  async logout(){

    await this.authService.logout();

    this.router.navigate(['/login']);

  }

}