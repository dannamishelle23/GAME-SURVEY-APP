import { Component, OnInit } from '@angular/core';

import { FormsModule } from '@angular/forms';

import { NgIf, CommonModule } from '@angular/common';

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

import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

import { Geolocation } from '@capacitor/geolocation';

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
    FormsModule,
    NgIf,
    CommonModule
  ],
})
export class NewSurveyPage implements OnInit {

  apodo = '';
  edad = '';
  rol = '';
  videojuego = '';
  plataforma = '';
  genero = '';
  comentario = '';
  image = '';
  latitud:number | null = null;
  longitud:number | null = null;

  constructor(
    private surveyService: SurveyService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getLocation();
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

  async getLocation(){

  try {

    const coordinates = await Geolocation.getCurrentPosition();

    this.latitud = coordinates.coords.latitude;
    this.longitud =
    coordinates.coords.longitude;
    console.log(
        this.latitud,
        this.longitud
      );

    } catch (error) {

      console.log(error);

    }
  }

  async selectImage(){
    try {

      const image =
        await Camera.getPhoto({
          quality:50,
          allowEditing:false,
          resultType: CameraResultType.Base64,
          source:CameraSource.Prompt
        });

      this.image = `data:image/jpeg;base64, ${image.base64String}`;

    } catch (error) {

      console.log(error);

    }
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
        comentario:this.comentario,
        imagen: this.image,
        latitud: this.latitud,
        longitud: this.longitud
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