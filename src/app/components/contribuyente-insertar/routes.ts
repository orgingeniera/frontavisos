import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    
    path: '',
    data: {
      title: 'Insertar contribuyente'
    },
    children: [
      {
        path: '',
        redirectTo: 'insertarcontribuyente',
        pathMatch: 'full'
      },
      {
        path: 'insertarcontribuyente',
        loadComponent: () => import('./contribuyente-insertar.component').then(m => m.ContribuyenteinsertarComponent),
        data: {
          title: 'Insertar contribuyente'
        }
      },
      {
        path: 'modificarcontribuyente/:id',
        loadComponent: () => import('./contribuyente-insertar.component').then(m => m.ContribuyenteinsertarComponent),
        data: {
          title: 'modificar contribuyente'
        }
      }
    ]
  }
];
