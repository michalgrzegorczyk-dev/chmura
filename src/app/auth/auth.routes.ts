import {Route} from '@angular/router';

export const authRoutes: Route[] = [
  {
    path: 'login',
    loadComponent: () => import('./auth.component')
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
];
