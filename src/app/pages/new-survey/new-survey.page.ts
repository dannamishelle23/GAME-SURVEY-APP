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
    CommonModule,
  ],
})
export class NewSurveyPage implements OnInit {

  apodo = '';
  edad: number | null = null;
  rol = '';
  lugar = '';
  videojuego = '';
  rating: number | null = null;
  plataforma = '';
  genero = '';
  comentario = '';

  image = '';

  latitud: number | null = null;
  longitud: number | null = null;

  fecha = '';

  constructor(
    private surveyService: SurveyService,
    private toastController: ToastController
  ) {}

  ngOnInit() {
    this.getLocation();
  }

  // TOAST MEJORADO (IMPORTANTE PARA DEPLOY)
  async showToast(message: string, color: string) {

    const toast = await this.toastController.create({
      message,
      duration: 2000,
      position: 'top',
      color,
      cssClass: 'custom-toast'
    });

    await toast.present();
  }

  // GPS
  async getLocation() {

    try {
      const coordinates = await Geolocation.getCurrentPosition();

      this.latitud = coordinates.coords.latitude;
      this.longitud = coordinates.coords.longitude;

    } catch {
      this.latitud = null;
      this.longitud = null;
    }
  }

  // CAMERA
  async selectImage() {

    try {

      const photo = await Camera.getPhoto({
        quality: 60,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Prompt
      });

      this.image = photo.base64String
        ? `data:image/jpeg;base64,${photo.base64String}`
        : '';

    } catch {
      // silent
    }
  }

  // SAVE
  async saveSurvey() {

    try {

      this.fecha = new Date().toISOString();

      if (!this.apodo || !this.videojuego || !this.rol) {
        await this.showToast('Completa los campos obligatorios', 'warning');
        return;
      }

      await this.surveyService.createSurvey({
        apodo: this.apodo,
        edad: this.edad,
        rol: this.rol,
        videojuego: this.videojuego,
        rating: this.rating,
        plataforma: this.plataforma,
        genero: this.genero,
        comentario: this.comentario,
        image: this.image,
        latitud: this.latitud,
        longitud: this.longitud,
        lugar: this.lugar,
        fecha: this.fecha
      });

      this.resetForm();

      setTimeout(async () => {
        await this.showToast('Encuesta guardada correctamente', 'success');
      }, 150);

    } catch (error: any) {

      await this.showToast(
        error.message || 'Error al guardar',
        'danger'
      );
    }
  }

  // RESET COMPLETO 
  resetForm() {

    this.apodo = '';
    this.edad = null;
    this.rol = '';
    this.lugar = '';
    this.videojuego = '';
    this.rating = null;
    this.plataforma = '';
    this.genero = '';
    this.comentario = '';
    this.image = '';

    // refrescar GPS
    this.getLocation();
  }
}