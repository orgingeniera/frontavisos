import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./declaracionmensual-list.component').then(m => m.avisosytableroListComponent),
    data: {
      title: `Declaración mensual`
    }
  }
];

