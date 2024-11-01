import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    
    path: '',
    data: {
      title: 'Insertar declaración bimestral'
    },
    children: [
      {
        path: '',
        redirectTo: 'insertardelbimestral',
        pathMatch: 'full'
      },
      {
        path: 'insertardelbimestral',
        loadComponent: () => import('./insertdeclaracionbimestral.component').then(m => m.InsertdeclaracionBimestralComponent),
        data: {
          title: 'Insertar declaración bimestral'
        }
      },
      {
        path: 'modificardeclaracionbimestral/:id',
        loadComponent: () => import('./insertdeclaracionbimestral.component').then(m => m.InsertdeclaracionBimestralComponent),
        data: {
          title: 'modificar declaración bimestral'
        }
      }
    ]
  }
];
