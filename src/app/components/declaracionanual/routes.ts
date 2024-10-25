import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    
    path: '',
    data: {
      title: 'Insertar declaració anual'
    },
    children: [
      {
        path: '',
        redirectTo: 'insertardelanul',
        pathMatch: 'full'
      },
      {
        path: 'insertardelanul',
        loadComponent: () => import('./declaracionanual.component').then(m => m.DeclaracionanualComponent),
        data: {
          title: 'Insertar declaración anual'
        }
      },
      {
        path: 'modificarelanul/:id',
        loadComponent: () => import('./declaracionanual.component').then(m => m.DeclaracionanualComponent),
        data: {
          title: 'modificar declaración anual'
        }
      }
    ]
  }
];
