import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { Router, RouterLink } from '@angular/router';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonList,
  IonItem,
  IonInput,
  IonButton,
  IonIcon
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular';

import { addIcons } from 'ionicons';
import { personOutline, atOutline, mailOutline, lockClosedOutline, personAddOutline } from 'ionicons/icons';

import { AuthService } from 'src/app/services/auth';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  standalone: true,

  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonList,
    IonItem,
    IonButton,
    IonIcon,
    RouterLink,
    FormsModule
  ],
})

export class RegisterPage {

  nombres = '';
  nickname = '';
  email = '';
  password = '';

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {
    addIcons({
      personOutline,
      atOutline,
      mailOutline,
      lockClosedOutline,
      personAddOutline
    });
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

  async register() {

    try {

      await this.authService.register(
        this.nombres,
        this.nickname,
        this.email,
        this.password
      );

      const response = await this.authService.register(
        this.nombres,
        this.nickname,
        this.email,
        this.password
      );

      await this.showToast(response.msg, 'success');

      this.router.navigate(['/login']);

    } catch (error:any) {

      await this.showToast(error.message, 'danger');

    }

  }

}