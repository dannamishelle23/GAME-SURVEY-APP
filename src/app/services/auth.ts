import { Injectable, inject } from '@angular/core';

import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut
} from '@angular/fire/auth';

import {
  Firestore,
  doc,
  setDoc,
  serverTimestamp,
  collection,
  query,
  where,
  getDocs
} from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private auth = inject(Auth);

  private firestore = inject(Firestore);

  async register(
    nombres: string,
    nickname: string,
    email: string,
    password: string
  ) {

    try {

      // VALIDAR NICKNAME REPETIDO

      const nicknameQuery = query(
        collection(this.firestore, 'usuarios'),
        where('nickname', '==', nickname)
      );

      const nicknameSnapshot =
        await getDocs(nicknameQuery);

      if (!nicknameSnapshot.empty) {

        throw new Error(
          'El nickname ya está en uso'
        );

      }

      // CREAR USUARIO

      const response =
        await createUserWithEmailAndPassword(
          this.auth,
          email,
          password
        );

      const uid = response.user.uid;

      // GUARDAR USUARIO EN FIRESTORE

      await setDoc(
        doc(this.firestore, 'usuarios', uid),
        {
          nombres,
          nickname,
          email,
          uid,
          createdAt: serverTimestamp()
        }
      );

      return {
        ok: true,
        msg: 'Usuario creado correctamente'
      };

    } catch (error: any) {

      // MENSAJES PERSONALIZADOS

      if (
        error.code === 'auth/email-already-in-use'
      ) {

        throw new Error(
          'El correo ya está registrado'
        );

      }

      if (
        error.code === 'auth/invalid-email'
      ) {

        throw new Error(
          'Correo inválido'
        );

      }

      if (
        error.code === 'auth/weak-password'
      ) {

        throw new Error(
          'La contraseña debe tener mínimo 6 caracteres'
        );

      }

      throw error;

    }

  }

  async login(
    email: string,
    password: string
  ) {

    try {

      const response =
        await signInWithEmailAndPassword(
          this.auth,
          email,
          password
        );

      return {
        ok: true,
        user: response.user
      };

    } catch (error: any) {

      if (
        error.code === 'auth/invalid-credential'
      ) {

        throw new Error(
          'Correo o contraseña incorrectos'
        );

      }

      throw error;

    }

  }

  logout() {
    return signOut(this.auth);
  }

  getCurrentUser() {
    return this.auth.currentUser
  }
}