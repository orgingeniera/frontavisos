import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./excel-declaracionmensual.component').then(m => m.ExcelDeclaracionMensualComponent),
    data: {
      title: `Subir declaración mensual`
    }
  }
];

