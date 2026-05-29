import { Component, OnInit, inject } from '@angular/core';

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
import { Auth, onAuthStateChanged } from '@angular/fire/auth';

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

  private auth = inject(Auth);

  constructor(
    private authService: AuthService,
    private router: Router,
    private toastController: ToastController
  ) {}

  ngOnInit() {

    // 🔥 escucha real de Firebase Auth (CORRECTO)
    onAuthStateChanged(this.auth, (user) => {

      if (user) {
        this.router.navigate(['/home'], { replaceUrl: true });
      }

    });
  }

  async showToast(message: string, color: string) {

    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color
    });

    await toast.present();
  }

  async login() {

    try {

      await this.authService.login(this.email, this.password);

      await this.showToast('Bienvenido', 'success');

      //navegación segura post-login
      this.router.navigate(['/home'], { replaceUrl: true });

    } catch (error: any) {

      await this.showToast(error.message, 'danger');

    }
  }
}