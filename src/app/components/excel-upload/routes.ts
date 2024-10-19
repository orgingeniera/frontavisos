import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./excel-upload.component').then(m => m.ExcelUploadComponent),
    data: {
      title: `Lista de usuarios`
    }
  }
];

