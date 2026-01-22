import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'valentines-day',
    loadComponent: () => import('./home/home.component'),
  },
    {
    path: '**',
    redirectTo: 'valentines-day'
  }
];
