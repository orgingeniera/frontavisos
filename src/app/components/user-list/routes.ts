import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./user-list.component').then(m => m.UserListComponent),
    data: {
      title: `Lista de usuarios`
    }
  }
];

