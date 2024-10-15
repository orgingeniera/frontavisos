import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./insert-user.component').then(m => m.InsertUserComponent),
    data: {
      title: `Insertar Usuarios`
    }
  }
];
