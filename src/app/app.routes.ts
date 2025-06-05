import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/welcome/welcome.page').then(m => m.WelcomePage),
  },
  {
    path: 'home',
    loadComponent: () => import('./home/home.page').then(m => m.HomePage),
  },
  {
    path: 'chat',
    loadComponent: () => import('./chat/chat.page').then(m => m.ChatPage)
  },
  {
    path: '**',
    redirectTo: '',
    pathMatch: 'full',
  },  {
    path: 'verify-email',
    loadComponent: () => import('./verify-email/verify-email.page').then( m => m.VerifyEmailPage)
  }

];
