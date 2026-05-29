import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { Auth } from '@angular/fire/auth';

export const authGuard: CanActivateFn = () => {

  const auth = inject(Auth);
  const router = inject(Router);

  return new Promise((resolve) => {

    const unsubscribe = auth.onAuthStateChanged((user) => {

      unsubscribe(); // importante evitar loops

      if (user) {
        resolve(true);
      } else {
        router.navigate(['/login']);
        resolve(false);
      }

    });

  });

};