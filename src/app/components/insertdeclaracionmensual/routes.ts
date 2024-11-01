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
        redirectTo: 'insertardelmensual',
        pathMatch: 'full'
      },
      {
        path: 'insertardelmensual',
        loadComponent: () => import('./insertdeclaracionmensual.component').then(m => m.InsertdeclaracionmensualComponent),
        data: {
          title: 'Insertar declaración mensual'
        }
      },
      {
        path: 'modificardeclaracionmensual/:id',
        loadComponent: () => import('./insertdeclaracionmensual.component').then(m => m.InsertdeclaracionmensualComponent),
        data: {
          title: 'modificar declaración mensual'
        }
      }
    ]
  }
];
