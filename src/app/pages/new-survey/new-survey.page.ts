import { Component } from '@angular/core';

import { FormsModule } from '@angular/forms';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle,
  IonInput,
  IonButton,
  IonTextarea,
  IonSelect,
  IonSelectOption
} from '@ionic/angular/standalone';

import { ToastController } from '@ionic/angular';

import { SurveyService } from 'src/app/services/survey';

@Component({
  selector: 'app-new-survey',
  templateUrl: './new-survey.page.html',
  standalone: true,

  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonInput,
    IonButton,
    IonTextarea,
    IonSelect,
    IonSelectOption,
    FormsModule
  ],
})
export class NewSurveyPage {

  apodo = '';
  edad = '';
  rol = '';
  videojuego = '';
  plataforma = '';
  genero = '';
  comentario = '';

  constructor(
    private surveyService: SurveyService,
    private toastController: ToastController
  ) {}

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

  async saveSurvey(){

    try {

      await this.surveyService.createSurvey({
        apodo:this.apodo,
        edad:this.edad,
        rol:this.rol,
        videojuego:this.videojuego,
        plataforma:this.plataforma,
        genero:this.genero,
        comentario:this.comentario

      });

      await this.showToast(
        'Encuesta guardada',
        'success'
      );

    } catch (error:any) {

      await this.showToast(
        error.message,
        'danger'
      );

    }

  }

}