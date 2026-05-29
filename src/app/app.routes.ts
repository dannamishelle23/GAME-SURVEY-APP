import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
  {
    path: 'register',
    loadComponent: () => import('./pages/register/register.page').then( m => m.RegisterPage)
  },
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
    canActivate: [authGuard]
  },
  {
    path: 'new-survey',
    loadComponent: () => import('./pages/new-survey/new-survey.page').then( m => m.NewSurveyPage),
    canActivate: [authGuard]
  },
  {
    path: 'surveys',
    loadComponent: () => import('./pages/surveys/surveys.page').then( m => m.SurveysPage)
  },
];
