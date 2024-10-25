import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./avisosytablero-list.component').then(m => m.avisosytableroListComponent),
    data: {
      title: `Lista de avisos y tableros`
    }
  }
];

