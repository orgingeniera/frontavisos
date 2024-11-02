import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./vallas-list.component').then(m => m.VallasListComponent),
    data: {
      title: `Lista de vallas`
    }
  }
];

