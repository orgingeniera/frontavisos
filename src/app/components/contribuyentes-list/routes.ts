import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./contribuyentes-list.component').then(m => m.classcontribuyentesListComponent),
    data: {
      title: `Lista de contribuyentes`
    }
  }
];

