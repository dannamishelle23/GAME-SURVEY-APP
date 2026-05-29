# Game Survey Campus - Ionic App

Aplicación móvil desarrollada con Ionic + Angular para registrar encuestas sobre videojuegos dentro del campus.

## Tecnologías usadas
- Ionic Angular
- Firebase
- Firestore
- Capacitores de Android
- RAWG API

## Creación del proyecto
## 1. Crear el proyecto
ionic start game-survey blank --type=angular

## 2. Entrar a la carpeta:
cd game-survey

## 3. Instalar dependencias principales
- Firebase: npm install firebase @angular/fire
- Cámara: npm install @capacitor/camera
- GPS: npm install @capacitor/geolocation
- QR Code: npm install angularx-qrcode@20

## 4. Ejecutar la aplicación
ionic serve

## Generar Android

- Agregar plataforma Android: npx cap add android
- Compilar proyecto: ionic build
- Sincronizar Capacitor: npx cap sync
- Abrir Android Studio: npx cap open android

## Carga de la app a firebase hosting

1. Instalar Firebase CLI: npm install -g firebase tools
2. Iniciar sesion: firebase login (Se abrirá Google --> Aceptar cuenta) o se verá un mensaje. Ej: "Already logged in as dannamishelle.53@gmail.com"
3. Inicializar proyecto: firebase init hosting



# Funcionalidades
- Registro e inicio de sesión
- Encuestas de videojuegos
- GPS y ubicación
- Cámara y galería
- Consumo de API de videojuegos
- Cards con publicaciones
- Generación de QR
- Dashboard con Firebase Hosting
- API utilizada (RAWG API)
