import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular';

import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  standalone: true,

  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonButton,
    FormsModule,
    RouterLink
  ],
})

export class LoginPage implements OnInit {

  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit(): void {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.router.navigate(['home'])
    }
  }

  async showToast(
    message:string,
    color:string
  ){

    const toast =
      await this.toastController.create({

        message,
        duration:2000,
        position:'top',
        color

      });

    await toast.present();

  }

  async login() {

    try {

      await this.authService.login(
        this.email,
        this.password
      );

      await this.showToast('Bienvenido', 'success');

      this.router.navigate(['/home']);

    } catch (error:any) {

      await this.showToast(error.message, 'danger');

    }

  }

}