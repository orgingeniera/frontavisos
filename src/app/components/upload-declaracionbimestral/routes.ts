import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./excel-declaracionbimestral.component').then(m => m.ExcelDeclaracionBimestralComponent),
    data: {
      title: `Subir declaración mensual`
    }
  }
];

