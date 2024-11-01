import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./declaracionbimestral-list.component').then(m => m.DeclaracionbimestralListComponent),
    data: {
      title: `Declaración Bimestral`
    }
  }
];

