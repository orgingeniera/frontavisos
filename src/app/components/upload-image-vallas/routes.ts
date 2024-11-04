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
        loadComponent: () => import('./upload-image-vallas.component').then(m => m.UploadImageVallasComponent),
        data: {
          title: 'Modificar Usuarios'
        }
      }
      // Puedes agregar otras rutas aquí...
    ]
  }
];
