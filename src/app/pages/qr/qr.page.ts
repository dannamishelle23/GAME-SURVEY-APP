import { Component } from '@angular/core';
import { QRCodeComponent } from 'angularx-qrcode';

import {
  IonContent,
  IonHeader,
  IonToolbar,
  IonTitle
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-qr',
  templateUrl: './qr.page.html',
  standalone: true,
  imports: [
    IonContent,
    IonHeader,
    IonToolbar,
    IonTitle,
    QRCodeComponent
  ]
})
export class QrPage {

  // Cambiar por el link real que da firebase deploy hosting
  qrData: string = 'https://game-survey-app.web.app';

}