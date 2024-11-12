import { Routes } from '@angular/router';
import { DefaultLayoutComponent } from './layout';
import { authGuard } from './guards/auth.guard';
import { UvtManagerComponent } from './components/uvt-manager/uvt-manager.component'; 
import { UploadImageVallasComponent } from './components/upload-image-vallas/upload-image-vallas.component'; // Importar el componente
import { ReporteGeneralDeclaracionesComponent } from './components/reportegeneraldeclaraciones/reportegeneraldeclaraciones.component'; 
import { UploadImageComponent } from './components/upload-image/upload-image.component'; // Importar el componente
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
        path: 'gestion-declaraciones/uploadfileexcel',
        loadChildren: () => import('./components/excel-upload/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'gestion-declaraciones/uploadeclaracionmensual',
        loadChildren: () => import('./components/upload-declaracionmensual/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'gestion-declaraciones/uploadeclaraciobimestral',
        loadChildren: () => import('./components/upload-declaracionbimestral/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'gestion-declaraciones/avisosytableroslista',
        loadChildren: () => import('./components/avisosytablero-list/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'publicidadexterior/vallaslistas',
        loadChildren: () => import('./components/vallas-list/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'publicidadexterior/contribuyenteslista',
        loadChildren: () => import('./components/contribuyentes-list/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'gestion-declaraciones/declaracionmensuallista',
        loadChildren: () => import('./components/declaracionmensual-list/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'gestion-declaraciones/declaracionbimestrallista',
        loadChildren: () => import('./components/declaracionbimestral-list/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'insertardelanul',
        loadChildren: () => import('./components/declaracionanual/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'insertarvallas',
        loadChildren: () => import('./components/vallas-insertar/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'insertarcontribuyente',
        loadChildren: () => import('./components//contribuyente-insertar/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'insertardelmensual',
        loadChildren: () => import('./components/insertdeclaracionmensual/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'insertardelbimestral',
        loadChildren: () => import('./components/insertdeclaracionbimestral/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'modificardeclaracionmensual/:id',  // Nueva ruta para modificar
        loadChildren: () => import('./components/insertdeclaracionmensual/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'modificardeclaracionbimestral/:id',  // Nueva ruta para modificar
        loadChildren: () => import('./components/insertdeclaracionbimestral/routes').then((m) => m.routes),canActivate: [authGuard]
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
        path: 'modificardeclaracionanual/:id',  // Nueva ruta para modificar
        loadChildren: () => import('./components/declaracionanual/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'modificarvallas/:id',  
        loadChildren: () => import('./components/vallas-insertar/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'modificarcontribuyente/:id',  // Nueva ruta para modificar
        loadChildren: () => import('./components/contribuyente-insertar/routes').then((m) => m.routes),canActivate: [authGuard]
      },
      {
        path: 'uploadimage/:id', // Nueva ruta para cargar directamente el componente
        component: UploadImageComponent,
        canActivate: [authGuard], // Mantener la protección del guard
        data: {
          title: 'Modificar Imagen' // Puedes ajustar el título según lo necesites
        }
      },
      {
        path: 'uvt',
        component: UvtManagerComponent,
        canActivate: [authGuard], 
        data: {
          title: 'Modificar Uvt'
        }
      },
      {
        path: 'uploadimagevallas/:id', // Nueva ruta para cargar directamente el componente
        component: UploadImageVallasComponent,
        canActivate: [authGuard], // Mantener la protección del guard
        data: {
          title: 'Modificar Imagen' // Puedes ajustar el título según lo necesites
        }
      },
      {
        path: 'reportegeneral/:id', // Nueva ruta para cargar directamente el componente
        component: ReporteGeneralDeclaracionesComponent,
        canActivate: [authGuard], // Mantener la protección del guard
        data: {
          title: 'Reporte General de Declaraciones' // Puedes ajustar el título según lo necesites
        }
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
