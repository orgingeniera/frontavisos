import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './guards/auth.guard'
export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'userlista',
        loadChildren: () => import('./components/user-list/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'uploadfileexcel',
        loadChildren: () => import('./components/excel-upload/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'insertar',
        loadChildren: () => import('./components/insert-user/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'modificar/:id',  // Nueva ruta para modificar
        loadChildren: () => import('./components/insert-user/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'theme',
        loadChildren: () => import('./views/theme/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'base',
        loadChildren: () => import('./views/base/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'buttons',
        loadChildren: () => import('./views/buttons/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'forms',
        loadChildren: () => import('./views/forms/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'icons',
        loadChildren: () => import('./views/icons/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'notifications',
        loadChildren: () => import('./views/notifications/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'widgets',
        loadChildren: () => import('./views/widgets/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'charts',
        loadChildren: () => import('./views/charts/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'pages',
        loadChildren: () => import('./views/pages/routes').then((m) => m.routes),canActivate: [authGuard]
      }
    ]
  },
  {
    path: '404',
    loadComponent: () => import('./views/pages/page404/page404.component').then(m => m.Page404Component),
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    loadComponent: () => import('./views/pages/page500/page500.component').then(m => m.Page500Component),
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    loadComponent: () => import('./views/pages/login/login.component').then(m => m.LoginComponent),
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    loadComponent: () => import('./views/pages/register/register.component').then(m => m.RegisterComponent),
    data: {
      title: 'Register Page'
    }
  },
  { path: '**', redirectTo: 'login' }
];
