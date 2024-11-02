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
        redirectTo: 'insertarvallas',
        pathMatch: 'full'
      },
      {
        path: 'insertarvallas',
        loadComponent: () => import('./vallas-insertar.component').then(m => m.VallasInsertarComponent),
        data: {
          title: 'Insertar declaración anual'
        }
      },
      {
        path: 'modificardeclaracionanual/:id',
        loadComponent: () => import('./vallas-insertar.component').then(m => m.VallasInsertarComponent),
        data: {
          title: 'modificar declaración anual'
        }
      }
    ]
  }
];
