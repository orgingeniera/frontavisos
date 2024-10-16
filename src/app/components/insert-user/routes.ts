import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    
    path: '',
    data: {
      title: 'Insertar Usuarios'
    },
    children: [
      {
        path: '',
        redirectTo: 'insertar',
        pathMatch: 'full'
      },
      {
        path: 'insertar',
        loadComponent: () => import('./insert-user.component').then(m => m.InsertUserComponent),
        data: {
          title: 'Insertar Usuarios'
        }
      },
      {
        path: 'modificar/:id',
        loadComponent: () => import('./insert-user.component').then(m => m.InsertUserComponent),
        data: {
          title: 'modificar Usuarios'
        }
      }
    ]
  }
];
