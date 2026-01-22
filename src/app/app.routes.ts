import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'gift',
    loadComponent: () => import('./home/home.component'),
  },
    {
    path: '**',
    redirectTo: 'gift'
  }
];
