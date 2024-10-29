import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Gestión de Usuarios'
    },
    children: [
      {
        path: 'upload-image/:id',
        loadComponent: () => import('./upload-image.component').then(m => m.UploadImageComponent),
        data: {
          title: 'Modificar Usuarios'
        }
      }
      // Puedes agregar otras rutas aquí...
    ]
  }
];
